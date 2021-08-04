import { BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { generateValidModelId } from "../helpers";
import { Comanda } from "./Comanda";
import { Produto } from "./Produto";

@Index("comanda_produto_pkey", ["id"], { unique: true })
@Entity("comanda_produto", { schema: "public" })
export class ComandaProduto {
  @Column("text", { primary: true, name: "id" })
  id: string;

  @ManyToOne(() => Comanda, (comanda) => comanda.comandaProdutos)
  @JoinColumn([{ name: "comanda_id", referencedColumnName: "id" }])
  comanda: Comanda;

  @ManyToOne(() => Produto, (produto) => produto.comandaProdutos, {eager: true})
  @JoinColumn([{ name: "produto_id", referencedColumnName: "id" }])
  produto: Produto;

  @BeforeInsert()
  async generateId() {
    this.id = await generateValidModelId(ComandaProduto);
  }
}
