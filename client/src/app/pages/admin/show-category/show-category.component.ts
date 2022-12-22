import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { ICategory } from './category.interface';

@Component({
  selector: 'app-show-category',
  templateUrl: './show-category.component.html',
  styleUrls: ['./show-category.component.css'],
})
export class ShowCategoryComponent implements OnInit {
  constructor(private categoryService: CategoryService) {}

  category: ICategory[] = [];
  public getAllCategory() {
    return this.categoryService.getAllCategory();
  }

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
}
