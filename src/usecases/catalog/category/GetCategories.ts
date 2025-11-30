import { Category } from "@/src/domain/category/Category";
import { ICategoryService } from "@/src/domain/category/ICategoryService";

export class GetCategories {
    constructor(
        private readonly service: ICategoryService
    ) { }

    async execute(): Promise<Category[]> {
        return this.service.getAll();
    }
}
