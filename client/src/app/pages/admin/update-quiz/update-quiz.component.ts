import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css'],
})
export class UpdateQuizComponent implements OnInit {
  id = 0;
  quiz: any;
  category: any;
  constructor(
    private router: ActivatedRoute,
    private r: Router,
    private quizService: QuizService,
    private categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    //alert(this.router.snapshot.params['id']);

    this.quizService.getQuizById(this.id).subscribe({
      next: (data) => {
        console.log(data);
        this.quiz = data;
      },
      error: (e) => {
        console.log(e);
      },
    });

    this.categoryService.getAllCategory().subscribe({
      next: (data) => {
        console.log(data);
        this.category = data;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  public updateData() {
    this.quizService.updateQuiz(this.quiz, this.id).subscribe({
      next: (data) => {
        console.log(data);
        this.r.navigate(['/admin/quiz']);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
