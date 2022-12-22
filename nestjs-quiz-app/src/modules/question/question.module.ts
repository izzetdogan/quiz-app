import { Module } from '@nestjs/common';
import { QuizRepository } from '../quiz/quiz.repository';
import { QuizService } from '../quiz/quiz.service';
import { QuestionController } from './question.controller';
import { QuestionRepository } from './question.repository';
import { QuestionService } from './question.service';

@Module({
  controllers: [QuestionController],
  providers: [QuestionService, QuestionRepository, QuizService, QuizRepository],
})
export class QuestionModule {}
