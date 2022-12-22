import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserRole } from './user.role';
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
  @Column()
  firstname: string;
  @Column()
  lastname: string;

  @Column({ nullable: true })
  refreshToken: string;

  // @ManyToMany(() => Role, (role) => role.userRole, { eager: false })
  // @JoinTable()
  // roles: UserRole

  @Column({ type: 'enum', enum: UserRole, default: UserRole.NORMAL })
  role: UserRole;
}
