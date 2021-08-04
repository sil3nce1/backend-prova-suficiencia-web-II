import { BeforeInsert, BeforeUpdate, Column, Entity, Index, OneToMany } from "typeorm";
import { generateValidModelId } from "../helpers";
import { Comanda } from "./Comanda";
import * as bcryptjs from "bcryptjs";

@Index("account_email_key", ["email"], { unique: true })
@Index("account_pkey", ["id"], { unique: true })
@Entity("account", { schema: "public" })
export class Account {
  @Column("text", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "email", unique: true, length: 255 })
  email: string;

  @Column("text", { name: "senha" })
  senha: string;

  @Column("character varying", { name: "nome", length: 255 })
  nome: string;

  @Column("character varying", { name: "telefone", length: 13 })
  telefone: string;

  @OneToMany(() => Comanda, (comanda) => comanda.account, {eager: true})
  comandas: Comanda[];

  @BeforeInsert()
  async generateId() {
    this.id = await generateValidModelId(Account);
  }

  @BeforeInsert()
  @BeforeUpdate()
  format() {
    this.email = this.email.toLowerCase();
    this.senha = bcryptjs.hashSync(this.senha, Number.parseInt(process.env.HASH_SALT));
  }
}
