import { CreatePlasticModelType } from "@/src/models/catalog/plastic";
import { Plastic } from "./Plastic";

export interface IPlasticService {
    getAll(): Promise<Plastic[]>
    create(payload: CreatePlasticModelType): Promise<Plastic>
    delete(id: number): Promise<{ id: number, deletedAt: string }>
    update(id: number, payload: Partial<CreatePlasticModelType>): Promise<Plastic>;
}
