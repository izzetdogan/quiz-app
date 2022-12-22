import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PublicGuard } from 'src/utils/decorator/public.decorator';
import { CategoryService } from './category.service';
import { CreateCatogory } from './dto/create.category.dto';
import { UpdateCategoryDto } from './dto/update.category.dto';

@PublicGuard()
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  public getAllCategory() {
    return this.categoryService.getAllCategory();
  }

  @Get(':id')
  public getCategoryById(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.getCategoryById(id);
  }

  @Post()
  public addCategory(@Body() catdto: CreateCatogory) {
    return this.categoryService.addCategory(catdto);
  }

  @Put(':id')
  public updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(id, dto);
  }
  @Delete(':id')
  public deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.deleteCategory(id);
  }
}
