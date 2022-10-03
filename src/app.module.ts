import { Module } from '@nestjs/common';
import { NoteModule } from './note/note.module';
import { CategoryModule } from './category/category.module';
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
      ConfigModule.forRoot({
        envFilePath: '.env'
      }),

      NoteModule, CategoryModule
  ],
})
export class AppModule {}