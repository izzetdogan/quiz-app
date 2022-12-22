import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/service/quiz.service';
import { IQuiz } from './quiz.interface';

@Component({
  selector: 'app-show-quiz',
  templateUrl: './show-quiz.component.html',
  styleUrls: ['./show-quiz.component.css'],
})
export class ShowQuizComponent implements OnInit {
  constructor(private quizService: QuizService) {}

  quizzes: IQuiz[] = [];
  public getAllCategory() {
    return this.quizService.getAllQuiz();
  }

  ngOnInit(): void {
    this.quizService.getAllQuiz().subscribe({
      next: (data: any) => {
        this.quizzes = data;
        console.log(data);
      },
      error: (e) => {
        console.log('errro');
        console.log(e);
      },
    });
  }

  deleteQuiz(id: number) {
    this.quizService.deleteQuiz(id).subscribe({
      next: (data) => {
        this.quizzes = this.quizzes.filter((q) => q.id != id);
        console.log('basırlı');
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
