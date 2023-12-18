import React from 'react';
import { useState } from 'react';
import logo from './logo.svg';
//import logo from './dogebonk-dobo-logo.svg';
//import logo from './bitcoin-sv-1.svg';
import './App.css';
import { mint } from './Web3Service';
import ReCAPTCHA from 'react-google-recaptcha';

function App() {

  const [message, setMessage] = useState("Messages will be displayed here!");
  const [captcha, setCaptcha] = useState("");  
  function metamaskBtnClick() {
    if (captcha) {
      setMessage(`Processing your request...wait...`)
      mint()
        .then((tx) => setMessage(`Your tokens were sent to ${localStorage.getItem("wallet")}! Tx: ${tx}`))
        .catch(err => setMessage(err.response ? err.response.data : err.message));
      setCaptcha("");
    } else {
      setMessage("Check the I'm not a robot first");
    }
  }

  return (
    <div className="container my-5">
      <div className="p-5 text-center bg-body-primary rounded-3">
        <img src={logo} className="App-logo" alt="logo" />
        <hr />
        <h1 className="text-body-emphasis">Get your BEP-20 tokens for free!</h1>
        <p className="col-lg-8 mx-auto fs-5 text-muted">
          Earn 1.000 tokens* once a day just connecting your MetaMask® below.
        </p>
        <div className="d-inline-flex gap-2 mb-5">
          <button onClick={metamaskBtnClick}
            className="d-inline-flex align-items-center btn btn-warning btn-lg px-4 rounded-pill" type="button">
            <img src="/assets/metamask.svg" alt="MetaMask logo" width={256} />
          </button>
        
          <ReCAPTCHA sitekey={`${process.env.REACT_APP_RECAPTCHA_KEY}`}
            onChange={(value) => { setCaptcha(value || "") }}>
          </ReCAPTCHA>
          </div>        
        <hr />
        <div className="alert alert-warning" role="alert">
          <h3>{message}</h3>
        </div>
      </div>
    </div>
  );
}

export default App;