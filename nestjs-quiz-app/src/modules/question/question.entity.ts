import { Quiz } from 'src/modules/quiz/quiz.entity';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  AfterLoad,
} from 'typeorm';

@Entity()
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  option1: string;
  @Column()
  option2: string;
  @Column()
  option3: string;
  @Column()
  option4: string;

  @Column()
  answer: string;

  givenAnswer: string;
  @AfterLoad()
  setgivenAnswer() {
    this.givenAnswer = '';
  }

  @ManyToOne(() => Quiz, (quiz) => quiz.question, { onDelete: 'CASCADE' })
  quiz: Quiz;
}
