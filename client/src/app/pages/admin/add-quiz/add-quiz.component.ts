import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/service/category.service';
import { QuizService } from 'src/app/service/quiz.service';
import { ICategory } from '../show-category/category.interface';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
})
export class AddQuizComponent implements OnInit {
  constructor(
    private quizService: QuizService,
    private categoryService: CategoryService,
    private snack: MatSnackBar
  ) {}
  category: ICategory[] = [];
  public quiz = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestion: '',
    active: false,
    category: {
      id: '',
    },
  };
  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe({
      next: (data: any) => {
        this.category = data;
      },
      error: (e) => {
        console.log('errro');
      },
    });
  }

  addQuiz() {
    if (this.quiz.title.trim() == '' || this.quiz.title == null) {
      this.snack.open('title Required', '', {
        duration: 3000,
        verticalPosition: 'top',
      });
    }

    this.quizService.addQuiz(this.quiz).subscribe({
      next: (data) => {
        console.log('basarili');
        this.quiz = {
          title: '',
          description: '',
          maxMarks: '',
          numberOfQuestion: '',
          active: false,
          category: {
            id: '',
          },
        };
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
