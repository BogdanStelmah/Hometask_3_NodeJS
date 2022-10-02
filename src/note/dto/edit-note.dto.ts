import {IsEnum, IsOptional, IsString} from "class-validator";
import {NoteState} from "../note.model";
import {Type} from "class-transformer";

export class EditNoteDto {
	@IsOptional()
	@IsString()
	name?: string

	@IsOptional()
	@IsString()
	categoryId?: number

	@IsOptional()
	@IsString()
	content?: string

	@IsOptional()
	@IsEnum(NoteState)
	state?: NoteState
}