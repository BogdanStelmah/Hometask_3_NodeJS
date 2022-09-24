import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {NoteModel, NoteState} from "./note.model";
import {SaveNoteDto} from "./dto/save-note.dto";
import {NOTE_NOT_FOUND} from "./note.constants";
import { v4 as uuidv4 } from 'uuid';
import {EditNoteDto} from "./dto/edit-note.dto";

@Injectable()
export class NoteService {
	private notes: NoteModel[] = [
		{
			id: uuidv4(),
			name: 'Shopping list',
			created: new Date('May 08, 2021').toISOString(),
			category: {
				id: '3',
				name: 'Idea',
				imageSrc: 'https://cdn-icons-png.flaticon.com/512/2011/2011672.png',
			},
			content: 'Tomatoes, bread',
			dates: [],
			state: NoteState.active
		}
	]

	async create(dto: SaveNoteDto): Promise<NoteModel> {
		const newNote: NoteModel = {
			...dto,
			id: uuidv4(),
			created: new Date().toLocaleDateString()
		}

		this.notes.push(newNote);

		return newNote;
	}

	async delete(id: string): Promise<NoteModel> {
		const deletedNote = await this.getById(id)

		this.notes = this.notes.filter(note => note.id !== deletedNote.id)
		return deletedNote
	}

	async edit(dto: NoteModel): Promise<NoteModel> {
		const editElementIndex = this.notes.findIndex(note => note.id === dto.id);
		this.notes[editElementIndex] = {...this.notes[editElementIndex], ...dto};

		return this.notes[editElementIndex]
	}

	async getAll(): Promise<NoteModel[]> {
		return this.notes
	}

	async getById(id: string): Promise<NoteModel> {
		const note = this.notes.find(note => note.id === id)
		if (!note) {
			throw new HttpException(NOTE_NOT_FOUND, HttpStatus.NOT_FOUND)
		}

		return note
	}
}
