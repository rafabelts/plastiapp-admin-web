import { CreateCategoryModelType } from "@/src/models/catalog/category";
import { Category } from "./Category";

export interface ICategoryService {
    getAll(): Promise<Category[]>
    create(payload: CreateCategoryModelType): Promise<Category>
    delete(id: number): Promise<{ id: number, deletedAt: string }>
    update(id: number, payload: Partial<CreateCategoryModelType>): Promise<Category>;
}
