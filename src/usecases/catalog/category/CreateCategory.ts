import { ICategoryService } from "@/src/domain/category/ICategoryService";
import { CreateCategoryModelType } from "@/src/models/catalog/category";

export class CreateCategory {
    constructor(
        private readonly service: ICategoryService
    ) { }

    execute(payload: CreateCategoryModelType) {
        return this.service.create(payload);
    }
}
