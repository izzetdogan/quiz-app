import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.css'],
})
export class InstructionComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private router: Router
  ) {}
  id: any;
  quiz: any;
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.quizService.getQuizById(this.id).subscribe({
      next: (data) => {
        console.log(data);
        this.quiz = data;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  startQuiz() {
    let a = confirm('Do you wan to start th quiz');
    if (a) {
      this.router.navigate(['/start/' + this.id]);
    } else {
      alert('başlamadı');
    }
  }
}
