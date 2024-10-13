import { BaseEntity } from 'src/utils/config/base.entities';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class EntityUser extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  token: string;
}
