import { ICategoryService } from "@/src/domain/category/ICategoryService";

export class DeleteCategory {
    constructor(
        private readonly service: ICategoryService
    ) { }

    execute(id: number) {
        return this.service.delete(id);
    }
}
