import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post} from '@nestjs/common';
import {NoteDto} from "./dto/note.dto";
import {NoteService} from "./note.service";
import {CategoryService} from "../category/category.service";
import {SaveNoteDto} from "./dto/save-note.dto";
import {dateSearch} from "../utils/utils";
import {EditNoteDto} from "./dto/edit-note.dto";
import {NoteState} from "./note.model";
import {CATEGORY_NOT_FOUND} from "../category/category.constants";

@Controller('notes')
export class NoteController {
	constructor(private readonly noteService: NoteService,
				private readonly categoryService: CategoryService) {}

	@Get('/stats')
	async getDataStatistic() {

	}

	@Post()
	async create(@Body() dto: NoteDto) {
		const category = await this.categoryService.getById(dto.categoryId)
		if (!category) {
			throw new HttpException(CATEGORY_NOT_FOUND, HttpStatus.NOT_FOUND)
		}

		const newNote: SaveNoteDto = {
			category: category,
			content: dto.content,
			dates: dateSearch(dto.content),
			name: dto.name,
			state: NoteState.active
		}

		return this.noteService.create(newNote)
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		return await this.noteService.delete(id)
	}

	@Patch(':id')
	async edit(@Param('id') id: string, @Body() dto: EditNoteDto) {
		const editNote = await this.noteService.getById(id)
		const category = await this.categoryService.getById(dto.categoryId) || await editNote.category

		editNote.name = dto.name || editNote.name
		editNote.content = dto.content || editNote.content
		editNote.category = category
		editNote.dates = dto.content ? dateSearch(dto.content) : editNote.dates
		editNote.state = dto.state || editNote.state

		return await this.noteService.edit(editNote)
	}

	@Get(':id')
	async getById(@Param('id') id: string) {
		return await this.noteService.getById(id)
	}

	@Get()
	async getAll() {
		return await this.noteService.getAll()
	}
}
