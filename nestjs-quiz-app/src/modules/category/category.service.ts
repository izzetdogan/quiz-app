import { HttpException, Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CreateCatogory } from './dto/create.category.dto';
import { UpdateCategoryDto } from './dto/update.category.dto';

@Injectable()
export class CategoryService {
  constructor(private categoryRepo: CategoryRepository) {}

  async getAllCategory() {
    return await this.categoryRepo.find();
  }

  async getCategoryById(id: number) {
    const category = await this.findCat(id);

    return category;
  }

  async addCategory(catdto: CreateCatogory) {
    return await this.categoryRepo.save(catdto);
  }

  async updateCategory(id: number, dto: UpdateCategoryDto) {
    const cat = await this.findCat(id);
    cat.title = dto.title;
    cat.description = dto.description;
    cat.quiz = dto.quiz;
    return await this.categoryRepo.save(cat);
  }

  async deleteCategory(id: number) {
    const category = await this.findCat(id);
    return this.categoryRepo.remove(category);
  }

  private async findCat(id: number) {
    const category = await this.categoryRepo.findOneBy({ id: id });
    if (!category) throw new HttpException('There is no category', 400);

    return category;
  }
}
