import { IProductService } from "@/src/domain/product/IProductService";
import { Product } from "@/src/domain/product/Product";
import api from "@/src/lib/api";
import { CreateProductModelType } from "@/src/models/catalog/product";

export class ProductService implements IProductService {

    async getAll(): Promise<Product[]> {
        const { data } = await api.get("/product");
        const arr = Array.isArray(data) ? data : data?.responseObject || [];

        return arr.map((p: Product) => new Product(
            p.id,
            p.name,
            p.price,
            p.category,
            p.categoryId,
            p.createdAt,
            p.updatedAt
        ))
    }

    async create(payload: CreateProductModelType) {
        const { data } = await api.post("/product", payload);

        return new Product(
            data.responseObject.id,
            data.responseObject.name,
            data.responseObject.price,
            data.responseobject.category,
            data.responseobject.categoryId,
            data.responseObject.createdAt,
            data.responseObject.updatedAt,
        );
    }

    async delete(id: number) {
        const { data } = await api.delete(`/product/${id}`);

        return {
            id: data.responseObject.id,
            deletedAt: data.responseObject.deletedAt
        }
    }

    async update(id: number, payload: Partial<CreateProductModelType>): Promise<Product> {
        const { data } = await api.put(`/product/${id}`, payload);

        return new Product(
            data.responseObject.id,
            data.responseObject.name,
            data.responseObject.price,
            data.responseObject.category,
            data.responseobject.categoryId,
            data.responseObject.createdAt,
            data.responseObject.updatedAt
        );
    }
}