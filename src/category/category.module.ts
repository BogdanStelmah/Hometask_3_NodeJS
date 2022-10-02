import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Category} from "./category.model";

@Module({
  providers: [CategoryService],
  exports: [CategoryService],
  controllers: [CategoryController],
  imports: [
    SequelizeModule.forFeature([Category]),
  ]
})
export class CategoryModule {}
