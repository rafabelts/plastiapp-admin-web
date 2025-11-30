import { IPlasticService } from "@/src/domain/plastic/IPlasticService";

export class DeletePlastic {
    constructor(
        private readonly service: IPlasticService
    ) { }

    execute(id: number) {
        return this.service.delete(id);
    }
}
