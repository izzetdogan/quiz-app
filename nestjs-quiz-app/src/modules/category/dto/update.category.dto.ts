import { Quiz } from 'src/modules/quiz/quiz.entity';

export class UpdateCategoryDto {
  title: string;

  description: string;

  quiz: Quiz[];
}
