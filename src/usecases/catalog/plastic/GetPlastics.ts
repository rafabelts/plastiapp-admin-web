import { IPlasticService } from "@/src/domain/plastic/IPlasticService";
import { Plastic } from "@/src/domain/plastic/Plastic";

export class GetPlastics {
    constructor(
        private readonly service: IPlasticService
    ) { }

    execute(): Promise<Plastic[]> {
        return this.service.getAll()
    }

}
