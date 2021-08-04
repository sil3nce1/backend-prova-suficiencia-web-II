import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { getRepository } from "typeorm";
import { Account } from "../models/Account";
import * as bcrytpjs from "bcryptjs";



interface TokenPayload {
    email: string;
    senha: string;
    ipAddress: string;
}


export const authMiddleware = async function(req: Request, res: Response, next: NextFunction) {
    try {
        const accountRepository = getRepository(Account);
        const token = req.header('Authorization').replace("Bearer", "").trim();
        const tokenPayload = verify(token, process.env.JWT_SECRET_KEY) as TokenPayload;
        
        if (tokenPayload.ipAddress != req.ip) 
        return res.status(400).json({success: false, message: "Invalid token"});

        const account = await accountRepository.findOne({email: tokenPayload.email, senha: tokenPayload.senha});
        if (!account)
        return res.status(400).json({success: false, message: "Invalid token"});

        req.account = account;
        return next();

    }
    catch {
        return res.status(400).json({success: false, message: "Invalid token"});
    }
}