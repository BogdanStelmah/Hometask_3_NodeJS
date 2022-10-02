import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Note, NoteState} from "./note.model";
import {NOTE_NOT_FOUND} from "./note.constants";
import {InjectModel} from "@nestjs/sequelize";
import {SaveNoteDto} from "./dto/save-note.dto";
import {EditNoteDto} from "./dto/edit-note.dto";
import {dateSearch} from "../utils/utils";

type StatType = {
	[key: string]: {
		active: number,
		archive: number
	}
}

@Injectable()
export class NoteService {
	constructor(@InjectModel(Note) private noteRepository: typeof Note) {}

	async create(dto: SaveNoteDto): Promise<Note> {
		return await this.noteRepository.create(dto);
	}

	async delete(id: number): Promise<Note> {
		const note = await this.noteRepository.findOne({ where: { id } })
		await note.destroy()
		return note
	}

	async edit(id: number, dto: EditNoteDto): Promise<Note> {
		const note = await this.getById(id)

		let dates = note.dates
		if (dto.content !== undefined) {
			dates = dateSearch(dto.content)
		}

		note.set({...dto, dates})
		return await note.save()
	}

	async getAll(): Promise<Note[]> {
		return await this.noteRepository.findAll({ include: { all: true } });
	}

	async getById(id: number): Promise<Note> {
		const note = await this.noteRepository.findOne({where: {id}})
		if (!note) {
			throw new HttpException(NOTE_NOT_FOUND, HttpStatus.NOT_FOUND)
		}

		return note
	}

	async getStat(): Promise<StatType> {
		const stat: StatType = {}

		const notes = await this.noteRepository.findAll({ include: { all: true } })

		notes.map(note => {
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
}
