import {Injectable} from '@nestjs/common';
import {CategoryModel} from "./category.model";

@Injectable()
export class CategoryService {
	private categories: CategoryModel[] = [
		{
			id: '1',
			name: 'Task',
			imageSrc: 'https://cdn-icons-png.flaticon.com/512/2838/2838694.png',
		},
		{
			id: '2',
			name: 'Random Thought',
			imageSrc: 'https://cdn-icons-png.flaticon.com/512/775/775558.png',
		},
		{
			id: '3',
			name: 'Idea',
			imageSrc: 'https://cdn-icons-png.flaticon.com/512/2011/2011672.png',
		}
	]

	async getAll(): Promise<CategoryModel[]> {
		return this.categories
	}

	async getById(id: string): Promise<CategoryModel> {
		return this.categories.find(category => category.id === id)
	}
}
