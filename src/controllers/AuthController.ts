import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Account } from "../models/Account";
import * as bcryptjs from "bcryptjs";
import { sign } from "jsonwebtoken";


class AuthController {
    public async signIn(req: Request, res: Response): Promise<Response> {
        const { email, senha } = req.body;
        const accountRepository = getRepository(Account);

        const account = await accountRepository.findOne({email});

        if (!account)
            return res.status(400).json({success: false, message: "Email ou senha invalidos"});

        if (!bcryptjs.compareSync(senha, account.senha))
            return res.status(400).json({success: false, message: "Email ou senha invalidos"});

        const token = sign({email: account.email, senha: account.senha, ipAddress: req.ip}, process.env.JWT_SECRET_KEY);
        return res.status(200).json({success: true, token});
    }
}

export default new AuthController();
