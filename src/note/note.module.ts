import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import {CategoryModule} from "../category/category.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {Note} from "./note.model";
import {Category} from "../category/category.model";

@Module({
  controllers: [NoteController],
  providers: [NoteService],
  imports: [
      SequelizeModule.forFeature([Note, Category]),
      CategoryModule
  ]
})
export class NoteModule {}
