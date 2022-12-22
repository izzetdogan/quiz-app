import { HttpException, Injectable } from '@nestjs/common';
import { QuizService } from '../quiz/quiz.service';
import { CreateQuestionDto } from './dto/create.question.dto';
import { updateQuestionDto } from './dto/update.question.dto';
import { QuestionRepository } from './question.repository';

@Injectable()
export class QuestionService {
  constructor(
    private questionRepos: QuestionRepository,
    private quizService: QuizService,
  ) {}

  public async getQuestions() {
    return await this.questionRepos.find();
  }

  public async getQuestionById(id: number) {
    return this.findQuestion(id);
  }

  public async getQuestionOfQuiz(qId: number) {
    const quiz = await this.quizService.getQuizForQuestionServiceById(qId);
    let questions = quiz.question;

    console.log('Number => ', questions);
    if (questions.length > quiz.numberOfQuestion) {
      questions = questions.slice(0, quiz.numberOfQuestion);
    }
    return questions
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  public async addQuestion(dto: CreateQuestionDto) {
    const question = await this.questionRepos.save(dto);
    return question;
  }

  public async updateQuestion(id: number, dto: updateQuestionDto) {
    const question = await this.findQuestion(id);
    const update = {
      id: question.id,
      answer: dto.answer,
      content: dto.content,
      option1: dto.option1,
      option2: dto.option2,
      option3: dto.option3,
      option4: dto.option4,
      quiz: dto.quiz,
    };
    return await this.questionRepos.save(update);
  }

  public async deleteQuestion(id: number) {
    const find = await this.findQuestion(id);
    await this.questionRepos.remove(find);
    return find;
  }

  private async findQuestion(id: number) {
    const question = await this.questionRepos.findOneBy({ id: id });
    if (!question) throw new HttpException('QuestionNot Found', 400);
    return question;
  }
}
