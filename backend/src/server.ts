import dotenv from 'dotenv';
dotenv.config();

import { mintAndTransfer } from './Web3Provider';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

const PORT: number = parseInt(`${process.env.PORT || 3001}`);
const app = express();

/**
 * Middlewares
 */
app.use(helmet());
app.use(morgan('tiny'));
app.use(cors({
    origin: process.env.CORS_ALLOWED_URL || '*'
}));

const nextMint = new Map<string, number>();

app.post('/mint/:wallet', async (req: Request, res: Response, next: NextFunction) => {
    const wallet = req.params.wallet;
    if (nextMint.has(wallet) && nextMint.get(wallet)! > Date.now()) {
        return res.status(400).json(`You can't receive tokens twice in a day. Try again tomorrow.`);
    }
    try {
        const tx = await mintAndTransfer(wallet);
        res.json(tx);
    } catch (error) {
        res.status(500).json(error);
    }
    nextMint.set(wallet, (Date.now() + 1000 * 60 * 60 * 24));

})

app.listen(PORT, () => console.log(`Server listening at port ${PORT}`));

//contract V2= 0xE54FF84039eaa5D1Ec53E9c2C1aA0936A3288a1F