import {Column, Model, Table, DataType, ForeignKey, HasOne, BelongsTo} from "sequelize-typescript";
import {Category} from "../category/category.model";

interface NoteCreationsAttrs {
	name: string
	categoryId: number
	content: string
	dates: string[]
}

export enum NoteState {
	active = "Active",
	archive = "Archive"
}

@Table({ tableName: 'notes' })
export class Note extends Model<Note, NoteCreationsAttrs> {
	@Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
	id: number

	@Column({type: DataType.STRING, allowNull: false})
	name: string

	@ForeignKey(() => Category)
	@Column({type: DataType.INTEGER})
	categoryId: number

	@BelongsTo(() => Category)
	category: Category

	@Column({type: DataType.STRING})
	content: string

	@Column({type: DataType.ARRAY(DataType.STRING), defaultValue: []})
	dates: string[]

	@Column({type: DataType.ENUM(...Object.values(NoteState)), defaultValue: NoteState.active})
	state: NoteState
}