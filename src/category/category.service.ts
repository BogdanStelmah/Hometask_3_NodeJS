import {Injectable} from '@nestjs/common';
import {Category} from "./category.model";
import {InjectModel} from "@nestjs/sequelize";

@Injectable()
export class CategoryService {
	constructor(@InjectModel(Category) private categoryRepository: typeof Category) {
	}

	async getAll(): Promise<Category[]> {
		return this.categoryRepository.findAll();
	}

	async getById(id: number): Promise<Category> {
		return this.categoryRepository.findOne({ where: { id } })
	}
}
