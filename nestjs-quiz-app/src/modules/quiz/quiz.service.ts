import { HttpException, Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create.quiz.dto';
import { UpdateQuizDto } from './dto/update.quiz.dto';
import { QuizRepository } from './quiz.repository';

@Injectable()
export class QuizService {
  constructor(private quizRepo: QuizRepository) {}

  public async addQuiz(quizDto: CreateQuizDto) {
    //const categoryId = quizDto.category.id;
    //if() valid for categoryId
    const quiz = await this.quizRepo.save(quizDto);

    return quiz;
  }

  public async updateQuiz(id: number, updateDto: UpdateQuizDto) {
    const quiz = await this.findQuiz(id);
    quiz.title = updateDto.title;
    quiz.category = updateDto.category;
    quiz.active = updateDto.active;
    quiz.description = updateDto.description;
    quiz.maxMarks = updateDto.maxMarks;
    quiz.numberOfQuestion = updateDto.numberOfQuestion;
    quiz.question = updateDto.question;

    return await this.quizRepo.save(quiz);
  }

  public async getQuiz() {
    return await this.quizRepo.find({
      relations: {
        category: true,
      },
    });
  }

  public async getQuizBydId(id: number) {
    return await this.findQuiz(id);
  }

  public async deleteQuiz(id: number) {
    const quiz = await this.findQuiz(id);

    return await this.quizRepo.remove(quiz);
  }

  public async getQuizForQuestionServiceById(id: number) {
    const quiz = await this.quizRepo.findOne({
      where: { id: id },
      relations: { question: true },
    });
    if (!quiz) throw new HttpException('Quiz not dounf', 400);
    return quiz;
  }

  public async getQuizOfCat(id: number) {
    const quizzes = await this.quizRepo.findByCategory(id);
    return quizzes;
  }

  private async findQuiz(id: number) {
    const quiz = await this.quizRepo.findOne({
      where: { id: id },
      relations: { category: true },
    });
    if (!quiz) throw new HttpException('Quiz not dounf', 400);
    return quiz;
  }
}
