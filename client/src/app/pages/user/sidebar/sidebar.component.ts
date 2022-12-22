import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private quizService: QuizService
  ) {}
  category: any;
  quizzes: any;

  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe({
      next: (data) => {
        this.category = data;
      },
      error: (e) => {
        console.log(e);
      },
    });

    this.quizService.getAllQuiz().subscribe({
      next: (data) => {
        this.quizzes = data;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
