import {CategoryModel} from "../../category/category.model";
import {NoteState} from "../note.model";

export class SaveNoteDto {
	name: string
	category: CategoryModel
	content: string
	dates: string[]
	state: NoteState
}