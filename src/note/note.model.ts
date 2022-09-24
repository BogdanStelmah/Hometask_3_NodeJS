import {CategoryModel} from "../category/category.model";

export class NoteModel {
	id: string
	name: string
	created: string
	category: CategoryModel
	content: string
	dates: string[]
	state: NoteState
}

export enum NoteState {
	active = "Active",
	archive = "Archive"
}
