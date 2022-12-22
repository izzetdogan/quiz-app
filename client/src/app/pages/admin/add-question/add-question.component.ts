import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
})
export class AddQuestionComponent implements OnInit {
  id: any;
  title: any;

  question = {
    quiz: { id: '' },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  };
  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.title = this.route.snapshot.params['title'];
    this.question.quiz['id'] = this.id;
  }

  formData() {
    //Validating

    this.questionService.addQuestion(this.question).subscribe({
      next: (data) => {
        console.log(data);
        this.question = {
          quiz: { id: '' },
          content: '',
          option1: '',
          option2: '',
          option3: '',
          option4: '',
          answer: '',
        };
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
