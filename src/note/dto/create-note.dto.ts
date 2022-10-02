import {IsNumber, IsString} from "class-validator";

export class CreateNoteDto {
	@IsString()
	name: string

	@IsNumber()
	categoryId: number

	@IsString()
	content: string
}