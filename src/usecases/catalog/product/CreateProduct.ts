import { IProductService } from "@/src/domain/product/IProductService";
import { CreateProductModelType } from "@/src/models/catalog/product";

export class CreateProduct {

    constructor(
        private readonly service: IProductService
    ) { }

    execute(payload: CreateProductModelType) {
        return this.service.create(payload);
    }
}
