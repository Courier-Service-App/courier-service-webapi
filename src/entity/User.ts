import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: "users" })
export class User {

  @PrimaryGeneratedColumn("uuid")
  user_id: string

  @Column({ unique: true })
  email: string

  @Column()
  first_name: string

  @Column()
  last_name: string

  @Column()
  address: string

  @Column()
  phone: string

  @Column({ default: "GENERAL" })
  type: string

  @Column()
  password: string

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
