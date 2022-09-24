import { Module } from '@nestjs/common';
import { NoteModule } from './note/note.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [NoteModule, CategoryModule],
})
export class AppModule {}