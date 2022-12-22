import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from './helper';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private httpClient: HttpClient) {}

  getQuestionOfQuiz(id: number) {
    return this.httpClient.get(`${baseUrl}/question/quiz/${id}`);
  }
  addQuestion(question: any) {
    return this.httpClient.post(`${baseUrl}/question`, question);
  }

  deleteQuestion(id: number) {
    return this.httpClient.delete(`${baseUrl}/question/${id}`);
  }
}
