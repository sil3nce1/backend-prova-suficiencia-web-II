import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Account } from "../models/Account";
import * as EmailValidator from "email-validator";
import { hasOnlyDigits } from "../helpers";



class AccountController {
    public async index(req: Request, res: Response): Promise<Response> { 
        const account = req.account;
        delete account.senha;
        return res.status(200).json(account);
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const { nome, telefone, email, senha } = req.body;
        const accountRepository = getRepository(Account);

        if (!EmailValidator.validate(email))
            return res.status(400).json({success: false, message: "Email inválido"});

        if ((telefone.length > 13) || (!hasOnlyDigits(telefone)))
            return res.status(400).json({success: false, message: "Telefone inválido"})
            

        try {
            const account = accountRepository.create({
                nome,
                telefone,
                email,
                senha
            });
            await accountRepository.save(account);
            return res.status(200).json({success: true, message: "Conta criada com sucesso"});
        }
        catch {
            return res.status(400).json({success: false, message: "Houve um erro ao registrar a conta"});
        }

    }
}


export default new AccountController();