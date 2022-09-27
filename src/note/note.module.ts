import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import {CategoryModule} from "../category/category.module";

@Module({
  controllers: [NoteController],
  providers: [NoteService],
  imports: [CategoryModule]
})
export class NoteModule {}
