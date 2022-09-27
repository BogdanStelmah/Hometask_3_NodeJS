import { IsString } from "class-validator";

export class NoteDto {
	@IsString()
	name: string

	@IsString()
	categoryId: string

	@IsString()
	content: string
}