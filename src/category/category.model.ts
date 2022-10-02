import {Column, DataType, Model, Table} from "sequelize-typescript";
interface CategoryCreateAttrs {
	name: string
	imageSrc: string
}

@Table({ tableName: 'categories' })
export class Category extends Model<Category, CategoryCreateAttrs>{
	@Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
	id: string

	@Column({type: DataType.STRING, allowNull: false})
	name: string

	@Column({type: DataType.STRING, allowNull: false})
	imageSrc: string
}
