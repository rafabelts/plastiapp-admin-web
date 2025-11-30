import { CreateCategoryModelType } from "@/src/models/catalog/category";
import { CreateProductModelType } from "@/src/models/catalog/product";
import { FormFieldConfig } from "@/src/models/formField";
import { z } from "zod";

export const CATEGORY_FIELDS: FormFieldConfig<CreateCategoryModelType>[] = [
    {
        name: "name",
        label: "Nombre",
        id: "category-name",
        type: "text",
        placeholder: "Producto"
    },
];

export const categorySchema = z.object({
    name: z.string().min(1, "El nombre es requerido")
});