import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-get-quiz',
  templateUrl: './get-quiz.component.html',
  styleUrls: ['./get-quiz.component.css'],
})
export class GetQuizComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService
  ) {}
  catId: any;
  quizzes: any;
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.catId = this.route.snapshot.params['catId'];
      if (this.catId == 0) {
        console.log('Load all quiz');
        this.quizService.getAllQuiz().subscribe({
          next: (data) => {
            this.quizzes = data;
            console.log(data);
          },
          error: (err) => {
            console.log(err);
          },
        });
      } else {
        console.log('fghjklşi');
        this.quizService.getQuizOfCatgory(this.catId).subscribe({
          next: (dat) => {
            this.quizzes = dat;
            console.log(this.quizzes);
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }
}
