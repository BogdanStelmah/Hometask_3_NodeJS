import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	ParseIntPipe,
	Patch,
	Post
} from '@nestjs/common';
import {CreateNoteDto} from "./dto/create-note.dto";
import {NoteService} from "./note.service";
import {CategoryService} from "../category/category.service";
import {SaveNoteDto} from "./dto/save-note.dto";
import {dateSearch} from "../utils/utils";
import {EditNoteDto} from "./dto/edit-note.dto";
import {CATEGORY_NOT_FOUND} from "../category/category.constants";

@Controller('notes')
export class NoteController {
	constructor(private readonly noteService: NoteService,
				private readonly categoryService: CategoryService) {}

	@Get('/stats')
	async getDataStatistic() {
		return await this.noteService.getStat();
	}

	@Post()
	async create(@Body() dto: CreateNoteDto) {
		const category = await this.categoryService.getById(dto.categoryId)
		if (!category) {
			throw new HttpException(CATEGORY_NOT_FOUND, HttpStatus.NOT_FOUND)
		}

		const newNote: SaveNoteDto = {
			categoryId: +category.id,
			content: dto.content,
			dates: dateSearch(dto.content),
			name: dto.name
		}

		return await this.noteService.create(newNote)
	}

	@Delete(':id')
	async remove(@Param('id', ParseIntPipe) id: number) {
		await this.noteService.delete(id)
	}

	@Patch(':id')
	async edit(@Param('id', ParseIntPipe) id: number, @Body() dto: EditNoteDto) {
		if (dto.categoryId) {
			const category = await this.categoryService.getById(dto.categoryId)
			if (!category) {
				throw new HttpException(CATEGORY_NOT_FOUND, HttpStatus.NOT_FOUND)
			}
		}

		return await this.noteService.edit(id, dto)
	}

	@Get(':id')
	async getById(@Param('id', ParseIntPipe) id: number) {
		return await this.noteService.getById(id)
	}

	@Get()
	async getAll() {
		return await this.noteService.getAll()
	}
}
