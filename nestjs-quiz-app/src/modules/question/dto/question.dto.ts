import { Quiz } from 'src/modules/quiz/quiz.entity';

export class QuestionDto {
  content: string;

  option1: string;
  option2: string;
  option3: string;
  option4: string;

  answer: string;

  quiz: Quiz;
}
