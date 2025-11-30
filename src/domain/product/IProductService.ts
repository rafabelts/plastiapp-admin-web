import { CreateProductModelType } from "@/src/models/catalog/product";
import { Product } from "./Product";


export interface IProductService {
    getAll(): Promise<Product[]>
    create(payload: CreateProductModelType): Promise<Product>
    delete(id: number): Promise<{ id: number, deletedAt: string }>
    update(id: number, payload: Partial<CreateProductModelType>): Promise<Product>;
}
