import { Module } from '@nestjs/common';
import { NoteModule } from './note/note.module';
import { CategoryModule } from './category/category.module';
import {ConfigModule} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import {Note} from "./note/note.model";
import {Category} from "./category/category.model";

@Module({
  imports: [
      ConfigModule.forRoot({
        envFilePath: '.env'
      }),

      SequelizeModule.forRoot({
          dialect: 'postgres',
          host: process.env.POSTGRES_HOST,
          port: +process.env.POSTGRES_PORT,
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB,
          models: [Note, Category],
          autoLoadModels: true
      }),

      NoteModule, CategoryModule
  ],
})
export class AppModule {}