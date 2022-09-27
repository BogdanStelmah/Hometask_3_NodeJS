import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {NoteModel, NoteState} from "./note.model";
import {SaveNoteDto} from "./dto/save-note.dto";
import {NOTE_NOT_FOUND} from "./note.constants";
import {v4 as uuidv4} from 'uuid';

type StatType = {
	[key: string]: {
		active: number,
		archive: number
	}
}

@Injectable()
export class NoteService {
	async create(dto: SaveNoteDto): Promise<NoteModel> {
		const newNote: NoteModel = {
			...dto,
			id: uuidv4(),
			created: new Date().toISOString()
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

	async getStat(): Promise<StatType> {
		const stat: StatType = {}

		this.notes.map(note => {
			const categoryName = note.category.name;
			if (!stat[categoryName]) {
				stat[categoryName] = {
					active: 0,
					archive: 0
				}
			}

			if(note.state === NoteState.active) {
				stat[categoryName].active += 1
			} else {
				stat[categoryName].archive += 1
			}
		})

		return stat
	}

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
		},
		{
			id: uuidv4(),
			name: 'New Feature',
			created: new Date('May 05, 2021').toISOString(),
			category: {
				id: '3',
				name: 'Idea',
				imageSrc: 'https://cdn-icons-png.flaticon.com/512/2011/2011672.png',
			},
			content: 'Feature 3/5/2021',
			dates: ['3/5/2021'],
			state: NoteState.active
		},
		{
			id: uuidv4(),
			name: 'Books',
			created: new Date('May 15, 2021').toISOString(),
			category: {
				id: '1',
				name: 'Task',
				imageSrc: 'https://cdn-icons-png.flaticon.com/512/2838/2838694.png',
			},
			content: 'The Lean Startup',
			dates: [],
			state: NoteState.active
		},
		{
			id: uuidv4(),
			name: 'The theory of everything',
			created: new Date('April 27, 2021').toISOString(),
			category: {
				id: '1',
				name: 'Task',
				imageSrc: 'https://cdn-icons-png.flaticon.com/512/2838/2838694.png',
			},
			content: 'The theory of everything',
			dates: [],
			state: NoteState.active
		},
		{
			id: uuidv4(),
			name: 'New Feature',
			created: new Date('May 05, 2021').toISOString(),
			category: {
				id: '3',
				name: 'Idea',
				imageSrc: 'https://cdn-icons-png.flaticon.com/512/2011/2011672.png',
			},
			content: 'New 3/5/2021',
			dates: ['3/5/2021'],
			state: NoteState.archive
		},
		{
			id: uuidv4(),
			name: 'Fruits',
			created: new Date('May 20, 2021').toISOString(),
			category: {
				id: '2',
				name: 'Random Thought',
				imageSrc: 'https://cdn-icons-png.flaticon.com/512/775/775558.png',
			},
			content: '',
			dates: [],
			state: NoteState.archive
		}
	]
}
