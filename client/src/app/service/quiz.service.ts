import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from './helper';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private httpClient: HttpClient) {}

  getAllQuiz() {
    return this.httpClient.get(`${baseUrl}/quiz`);
  }

  addQuiz(quiz: any) {
    return this.httpClient.post(`${baseUrl}/quiz`, quiz);
  }

  deleteQuiz(id: number) {
    return this.httpClient.delete(`${baseUrl}/quiz/${id}`);
  }

  getQuizById(id: number) {
    return this.httpClient.get(`${baseUrl}/quiz/${id}`);
  }

  updateQuiz(quiz: any, id: number) {
    return this.httpClient.put(`${baseUrl}/quiz/${id}`, quiz);
  }
  getQuizOfCatgory(id: number) {
    return this.httpClient.get(`${baseUrl}/quiz/category/${id}`);
  }
  getQuestionsOfTest(id: number) {
    return this.httpClient.get(`${baseUrl}/question/quiz/${id}`);
  }
}
