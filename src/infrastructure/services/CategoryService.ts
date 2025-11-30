import { Category } from "@/src/domain/category/Category";
import { ICategoryService } from "@/src/domain/category/ICategoryService";
import api from "@/src/lib/api";
import { CreateCategoryModelType } from "@/src/models/catalog/category";

export class CategoryService implements ICategoryService {
    async getAll(): Promise<Category[]> {
        const { data } = await api.get("/category");
        const arr = Array.isArray(data) ? data : data?.responseObject || [];

        return arr.map((c: Category) => new Category(
            c.id,
            c.name,
            c.createdAt,
            c.updatedAt
        ))
    }

    async create(payload: CreateCategoryModelType) {
        const { data } = await api.post("/category", payload);

        return new Category(
            data.responseObject.id,
            data.responseObject.name,
            data.responseObject.createdAt,
            data.responseObject.updatedAt,
        );
    }

    async delete(id: number) {
        const { data } = await api.delete(`/category/${id}`);

        return {
            id: data.responseObject.id,
            deletedAt: data.responseObject.deletedAt
        }
    }

    async update(id: number, payload: Partial<CreateCategoryModelType>): Promise<Category> {
        const { data } = await api.put(`/category/${id}`, payload);
        return new Category(
            data.responseObject.id,
            data.responseObject.name,
            data.responseObject.createdAt,
            data.responseObject.updatedAt
        );
    }
}