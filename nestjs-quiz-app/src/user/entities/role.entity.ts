import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './user.role';
@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userRole: UserRole;
}
