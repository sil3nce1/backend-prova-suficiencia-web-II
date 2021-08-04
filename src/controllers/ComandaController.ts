import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { generateValidModelId } from "../helpers";
import { Account } from "../models/Account";
import { Comanda } from "../models/Comanda";
import { ComandaProduto } from "../models/ComandaProduto";
import { Produto } from "../models/Produto";


interface ComandaRequest {
    produtos: Produto[];
}


class ComandaController {
    public async index(req: Request, res: Response): Promise<Response> {
        return res.status(200).json(await getRepository(Comanda).find({account: req.account}));
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const comandaRequest: ComandaRequest = req.body;
        const comandaRepository = getRepository(Comanda);
        const produtoRepository = getRepository(Produto);
        const comandaProdutoRepository = getRepository(ComandaProduto);
        
        const allProducts = await comandaRequest.produtos.map(async produto => {
            const product = produtoRepository.create({
                nome: produto.nome,
                preco: produto.preco
            });
            await produtoRepository.save(product);
            return produtoRepository.findOne({nome: produto.nome, preco: produto.preco});
        });
        const comandaId = await generateValidModelId(Account);

        let comanda = comandaRepository.create({
            id: comandaId,
            account: req.account
        });
        await comandaRepository.save(comanda);
        comanda = await comandaRepository.findOne(comandaId);
        
        allProducts.forEach(async product => {
            const comandaProduto = await comandaProdutoRepository.create({
                comanda,
                produto: await product
            });
            await comandaProdutoRepository.save(comandaProduto);
        });

        return res.status(200).json({success: true, message: "Comanda registrada com sucesso"});
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const comandaRequest: ComandaRequest = req.body;
        const { comandaId } = req.params;
        const comandaRepository = getRepository(Comanda);
        const comandaProdutoRepository = getRepository(ComandaProduto);

        const comanda = await comandaRepository.findOne(comandaId);
        if (!comanda)
            return res.status(400).json({success: false, message: "Comanda inválida"});

        
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { comandaId } = req.params;
        const comandaRepository = getRepository(Comanda);
        const comandaProdutoRepository = getRepository(ComandaProduto);

        const comanda = await comandaRepository.findOne({
            id: comandaId,
            account: req.account
        });
        if (!comanda)
            return res.status(400).json({success: false, message: "Comanda inválida"});

        comanda.comandaProdutos.forEach(async comandaProduto => {
            await comandaProdutoRepository.remove(comandaProduto);
        });
        await comandaRepository.remove(comanda);
        return res.status(200).json({success: { text: "Comanda removida com sucesso" }});
    }
}



export default new ComandaController();