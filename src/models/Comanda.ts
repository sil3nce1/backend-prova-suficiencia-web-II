import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { generateValidModelId } from "../helpers";
import { Account } from "./Account";
import { ComandaProduto } from "./ComandaProduto";

@Index("comanda_pkey", ["id"], { unique: true })
@Entity("comanda", { schema: "public" })
export class Comanda {
  @Column("text", { primary: true, name: "id" })
  id: string;

  @ManyToOne(() => Account, (account) => account.comandas)
  @JoinColumn([{ name: "account_id", referencedColumnName: "id" }])
  account: Account;

  @OneToMany(() => ComandaProduto, (comandaProduto) => comandaProduto.comanda, {eager: true})
  comandaProdutos: ComandaProduto[];
}
