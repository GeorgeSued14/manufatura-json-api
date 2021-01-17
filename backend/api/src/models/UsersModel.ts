import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import bcrypt from "bcryptjs";

import dotenv from "dotenv";
dotenv.config();

const SALT_ROUND = Number(process.env.BCRYPT_SALT_ROUND);

export interface UserInterface {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

@Entity("users")
export class User implements UserInterface {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone_number: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  hashPassword() {
    return bcrypt.hashSync(this.password, SALT_ROUND);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
