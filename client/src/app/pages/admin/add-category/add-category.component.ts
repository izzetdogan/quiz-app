import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as e from 'cors';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent {
  constructor(
    private categoryService: CategoryService,
    private snack: MatSnackBar
  ) {}
  public category = {
    title: '',
    description: '',
  };

  formSubmit() {
    if (this.category.title.trim() == '' || this.category.title == null) {
      this.snack.open('title Required', '', {
        duration: 3000,
        verticalPosition: 'top',
      });
    }
    if (
      this.category.description.trim() == '' ||
      this.category.description == null
    ) {
      this.snack.open('Desc Required', '', {
        duration: 3000,
        verticalPosition: 'top',
      });
    }

    //End of validate

    this.categoryService.addCategory(this.category).subscribe({
      next: (data) => {
        this.snack.open('Addes succs', '', {
          duration: 3000,
          verticalPosition: 'top',
        });
        console.log(data);
        this.category.title = '';
        this.category.description = '';
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
