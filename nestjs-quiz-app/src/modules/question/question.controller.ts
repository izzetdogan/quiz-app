import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PublicGuard } from 'src/utils/decorator/public.decorator';
import { CreateQuestionDto } from './dto/create.question.dto';
import { updateQuestionDto } from './dto/update.question.dto';
import { QuestionService } from './question.service';

@PublicGuard()
@Controller('question')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Get()
  public getQuestions() {
    return this.questionService.getQuestions();
  }

  @Get('id')
  public getQuestionById(@Param('id', ParseIntPipe) id: number) {
    return this.questionService.getQuestionById(id);
  }

  @Get('quiz/:id')
  public getQuestionOfQuiz(@Param('id', ParseIntPipe) id: number) {
    return this.questionService.getQuestionOfQuiz(id);
  }

  @Post()
  public addQuestion(@Body() dto: CreateQuestionDto) {
    return this.questionService.addQuestion(dto);
  }

  @Put(':id')
  public updateQuestion(
    @Param('id', ParseIntPipe) id: number,
    dto: updateQuestionDto,
  ) {
    return this.questionService.updateQuestion(id, dto);
  }

  @Delete(':id')
  public deleteQuestion(@Param('id', ParseIntPipe) id: number) {
    return this.questionService.deleteQuestion(id);
  }
}
