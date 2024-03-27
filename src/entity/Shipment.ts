import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Generated } from 'typeorm'

@Entity({ name: "shipments" })
export class Shipment {

  @PrimaryGeneratedColumn("uuid")
  shipment_id: string

  @Column({ unique: true })
  tracking_number: string

  @Column()
  sender_name: string

  @Column()
  sender_address: string

  @Column()
  recipient_name: string

  @Column()
  recipient_address: string

  @Column()
  details: string

  @Column()
  status: string

  @Column()
  created_by: string

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
