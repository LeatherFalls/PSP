import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'accounts' })
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  balance: number;
}
