import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export interface iProduct {
  id: number;
  title: String;
  type: String;
  description: String;
  filename: String;
  height: number;
  width: number;
  rating: number;
  price: number;
  created_at: Date;
  updated_at: Date;
}

@Entity("products")
export class Product implements iProduct {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  title: String;

  @Column()
  type: string;

  @Column()
  description: String;

  @Column()
  filename: String;

  @Column()
  height: number;

  @Column()
  width: number;

  @Column()
  rating: number;

  @Column()
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
