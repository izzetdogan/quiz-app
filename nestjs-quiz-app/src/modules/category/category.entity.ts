import { Quiz } from 'src/modules/quiz/quiz.entity';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(() => Quiz, (quiz) => quiz.category, {
    cascade: true,
  })
  quiz: Quiz[];
}
