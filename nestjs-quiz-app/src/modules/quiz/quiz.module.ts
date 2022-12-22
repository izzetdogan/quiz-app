import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizRepository } from './quiz.repository';
import { QuizService } from './quiz.service';

@Module({
  controllers: [QuizController],
  providers: [QuizService, QuizRepository],
})
export class QuizModule {}
