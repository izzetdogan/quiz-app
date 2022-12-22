import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Get,
  Delete,
  Put,
} from '@nestjs/common';
import { PublicGuard } from 'src/utils/decorator/public.decorator';
import { CreateQuizDto } from './dto/create.quiz.dto';
import { UpdateQuizDto } from './dto/update.quiz.dto';
import { QuizService } from './quiz.service';

@PublicGuard()
@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Post()
  public addQuiz(@Body() quizDto: CreateQuizDto) {
    return this.quizService.addQuiz(quizDto);
  }

  @Put(':id')
  public updateQuiz(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateQuizDto,
  ) {
    return this.quizService.updateQuiz(id, updateDto);
  }

  @Get()
  public getQuiz() {
    return this.quizService.getQuiz();
  }

  @Get(':id')
  public getQuizById(@Param('id', ParseIntPipe) id: number) {
    return this.quizService.getQuizBydId(id);
  }

  @Delete(':id')
  public deleteQuiz(@Param('id', ParseIntPipe) id: number) {
    return this.quizService.deleteQuiz(id);
  }
  @Get('/category/:id')
  public getQuizOfCategory(@Param('id', ParseIntPipe) id: number) {
    return this.quizService.getQuizOfCat(id);
  }
}
