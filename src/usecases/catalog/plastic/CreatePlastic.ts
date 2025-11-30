import { IPlasticService } from "@/src/domain/plastic/IPlasticService";
import { CreatePlasticModelType } from "@/src/models/catalog/plastic";


export class CreatePlastic {
    constructor(
        private readonly service: IPlasticService
    ) { }


    execute(payload: CreatePlasticModelType) {
        return this.service.create(payload);
    }
}
