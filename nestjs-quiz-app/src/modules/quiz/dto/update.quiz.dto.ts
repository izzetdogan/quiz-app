import { Category } from 'src/modules/category/category.entity';
import { Question } from 'src/modules/question/question.entity';

export class UpdateQuizDto {
  title: string;

  description: string;

  maxMarks: number;

  numberOfQuestion: number;

  active: boolean;

  category: Category;

  question: Question[];
}
