import { CreatePlasticModelType } from "@/src/models/catalog/plastic";
import { FormFieldConfig } from "@/src/models/formField";
import { z } from "zod";

export const PLASTIC_FIELDS: FormFieldConfig<CreatePlasticModelType>[] = [
    {
        name: "name",
        label: "Nombre",
        id: "plastic-name",
        type: "text",
        placeholder: "Producto"
    },
    {
        name: "price",
        label: "Precio",
        id: "plastic-price",
        type: "number",
        placeholder: "$10"
    },
];

export const plasticSchema = z.object({
    name: z.string().min(1, "El nombre es requerido"),
    price: z.number().min(0, "El precio debe ser mayor o igual a 0")
});