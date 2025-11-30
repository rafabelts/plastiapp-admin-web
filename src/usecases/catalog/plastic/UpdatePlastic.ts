import { IPlasticService } from "@/src/domain/plastic/IPlasticService";
import { CreatePlasticModelType } from "@/src/models/catalog/plastic";

export class UpdatePlastic {
    constructor(
        private readonly service: IPlasticService
    ) { }

    execute(id: number, payload: Partial<CreatePlasticModelType>) {
        return this.service.update(id, payload);
    }
}
