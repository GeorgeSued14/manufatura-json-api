import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export interface UserInterface {
  id: number;
  name: String;
  email: String;
  phone_number: String;
  password: String;
  created_at: Date;
  updated_at: Date;
}

@Entity("users")
export class User implements UserInterface {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: String;

  @Column()
  email: string;

  @Column()
  phone_number: String;

  @Column()
  password: String;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
