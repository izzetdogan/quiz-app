import { Quiz } from 'src/modules/quiz/quiz.entity';

export class CreateCatogory {
  title: string;

  description: string;

  quiz: Quiz[];
}
