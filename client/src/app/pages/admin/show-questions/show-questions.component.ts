import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'app-show-questions',
  templateUrl: './show-questions.component.html',
  styleUrls: ['./show-questions.component.css'],
})
export class ShowQuestionsComponent implements OnInit {
  id: any;
  title: any;
  questions: any = [];

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.title = this.route.snapshot.params['title'];
    this.questionService.getQuestionOfQuiz(this.id).subscribe({
      next: (data) => {
        console.log(data);
        this.questions = data;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  deleteQuestion(id: number) {
    this.questionService.deleteQuestion(id).subscribe({
      next: (data) => {
        console.log(data);
        this.questions = this.questions.filter((q: any) => q.id !== id);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
