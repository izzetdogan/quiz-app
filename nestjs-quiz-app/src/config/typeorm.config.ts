import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
import { Category } from 'src/modules/category/category.entity';
import { Question } from 'src/modules/question/question.entity';
import { Quiz } from 'src/modules/quiz/quiz.entity';
import { User } from 'src/user/entities/user.entity';

const DB_HOST = <string>process.env.DN_HOST;
const DB_NAME = String(process.env.DB_NAME);
const DB_USERNAME = String(process.env.DB_USERNAME);
const DB_PASSWORD = String(process.env.DB_PASSWORD);

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: 5432,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [User, Question, Category, Quiz],
  synchronize: true,
};
