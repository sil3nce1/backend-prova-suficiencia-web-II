import { BeforeInsert, Column, Entity, Index, OneToMany } from "typeorm";
import { generateValidModelId } from "../helpers";
import { ComandaProduto } from "./ComandaProduto";

@Index("produto_pkey", ["id"], { unique: true })
@Entity("produto", { schema: "public" })
export class Produto {
  @Column("text", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "nome", length: 255 })
  nome: string;

  @Column("double precision", { name: "preco", precision: 53 })
  preco: number;

  @OneToMany(() => ComandaProduto, (comandaProduto) => comandaProduto.produto)
  comandaProdutos: ComandaProduto[];

  @BeforeInsert()
  async generateId() {
    this.id = await generateValidModelId(Produto);
  }
}
