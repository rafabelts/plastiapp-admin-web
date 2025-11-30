import { IProductService } from "@/src/domain/product/IProductService";
import { Product } from "@/src/domain/product/Product";

export class GetProducts {

    constructor(
        private readonly service: IProductService
    ) { }

    execute(): Promise<Product[]> {
        return this.service.getAll()
    }

}
