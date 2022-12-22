import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/service/question.service';

export type IQuestion = {
  answer: string;
  content: string;
  id: number;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  givenAnswer: string;
  givenAnswerr: string;
};

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
  constructor(
    private locationStr: LocationStrategy,
    private route: ActivatedRoute,
    private questionService: QuestionService
  ) {}

  id: any;
  questions: IQuestion[] = [];
  userMarks = 0;
  correctAnswres = 0;
  isSubmit = true;
  attempted = 0;
  ngOnInit(): void {
    //this.preventBackButton();
    this.id = this.route.snapshot.params['id'];
    this.loadQuestions();
  }

  loadQuestions() {
    this.questionService.getQuestionOfQuiz(this.id).subscribe({
      next: (data: any) => {
        this.questions = data;
        console.log('data', data);
        this.questions.forEach((q: any) => {
          q['givenAnswerr'] = '';
          console.log('dfghjkl', q.answer);
        });
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  // preventBackButton() {
  //   history.pushState(null, '', location.href);

  //   this.locationStr.onPopState(() => {
  //     history.pushState(null, '', location.href);
  //   });
  // }

  convert(i: number) {
    let a: string = '';
    a = i + '';
    return a;
  }

  submitQuiz() {
    let a = confirm('Do you wan to start th quiz');
    if (a) {
      this.questions.forEach((q: any) => {
        if (q.givenAnswerr == q.answer) {
          console.log('answer', q.answer);
          console.log(q.givenAnswerr);
          this.correctAnswres++;
        }

        if (q.givenAnswerr.trim() !== '') {
          this.attempted++;
        }
        this.isSubmit = false;
      });
      console.log(this.questions);
      console.log('CorrectAnswer', this.correctAnswres);
    } else {
      this.isSubmit = false;
      alert('başlamadı');
    }
  }
}
