import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
  })
  created_At: Date;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
  })
  updated_dAt: Date;
}
