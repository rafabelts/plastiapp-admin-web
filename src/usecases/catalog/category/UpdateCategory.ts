import { ICategoryService } from "@/src/domain/category/ICategoryService";
import { CreateCategoryModelType } from "@/src/models/catalog/category";

export class UpdateCategory {
    constructor(
        private readonly service: ICategoryService
    ) { }

    execute(id: number, payload: Partial<CreateCategoryModelType>) {
        return this.service.update(id, payload);
    }
}
