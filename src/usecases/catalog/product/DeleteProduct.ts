import { IProductService } from "@/src/domain/product/IProductService";

export class DeleteProduct {
    constructor(
        private readonly service: IProductService
    ) { }

    execute(id: number) {
        return this.service.delete(id);
    }
}
