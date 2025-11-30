import { IPlasticService } from "@/src/domain/plastic/IPlasticService";
import { Plastic } from "@/src/domain/plastic/Plastic";
import api from "@/src/lib/api";
import { CreatePlasticModelType } from "@/src/models/catalog/plastic";

export class PlasticService implements IPlasticService {
    async getAll(): Promise<Plastic[]> {
        const { data } = await api.get("/plastic");
        const arr = Array.isArray(data) ? data : data?.responseObject || [];

        return arr.map((p: Plastic) => new Plastic(
            p.id,
            p.name,
            p.price,
            p.createdAt,
            p.updatedAt
        ))
    }

    async create(payload: CreatePlasticModelType) {
        const { data } = await api.post("/plastic", payload);

        return new Plastic(
            data.responseObject.id,
            data.responseObject.name,
            data.responseObject.price,
            data.responseObject.createdAt,
            data.responseObject.updatedAt,
        );
    }

    async delete(id: number) {
        const { data } = await api.delete(`/plastic/${id}`);

        return {
            id: data.responseObject.id,
            deletedAt: data.responseObject.deletedAt
        }
    }

    async update(id: number, payload: Partial<CreatePlasticModelType>): Promise<Plastic> {
        const { data } = await api.put(`/plastic/${id}`, payload);

        return new Plastic(
            data.responseObject.id,
            data.responseObject.name,
            data.responseObject.price,
            data.responseObject.createdAt,
            data.responseObject.updatedAt
        );
    }
}
