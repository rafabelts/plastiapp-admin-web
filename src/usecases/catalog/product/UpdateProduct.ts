import { IProductService } from "@/src/domain/product/IProductService";
import { CreateProductModelType } from "@/src/models/catalog/product";

export class UpdateProduct {

    constructor(
        private readonly service: IProductService
    ) { }


    execute(id: number, payload: Partial<CreateProductModelType>) {
        return this.service.update(id, payload);
    }
}
