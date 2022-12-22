import { Category } from 'src/modules/category/category.entity';
import { Question } from 'src/modules/question/question.entity';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Quiz extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  maxMarks: number;

  @Column()
  numberOfQuestion: number;

  @Column({ default: false })
  active: boolean;

  @ManyToOne(() => Category, (category) => category.quiz)
  category: Category;

  @OneToMany(() => Question, (question) => question.quiz, {
    onDelete: 'CASCADE',
  })
  question: Question[];
}
