import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Quiz } from './quiz.entity';

@Injectable()
export class QuizRepository extends Repository<Quiz> {
  constructor(private dataSource: DataSource) {
    super(Quiz, dataSource.createEntityManager());
  }

  async findByCategory(id: number) {
    return await this.find({
      where: {
        category: {
          id: id,
        },
      },
      relations: { category: true },
    });
  }
}
