import { CreateProductModelType } from "@/src/models/catalog/product";
import { FormFieldConfig } from "@/src/models/formField";
import { z } from "zod";

export const PRODUCT_FIELDS: FormFieldConfig<CreateProductModelType>[] = [
    {
        name: "name",
        label: "Nombre",
        id: "product-name",
        type: "text",
        placeholder: "Producto"
    },
    {
        name: "price",
        label: "Precio",
        id: "product-price",
        type: "number",
        placeholder: "$10"
    },
    {
        name: "categoryId",
        label: "Categoria",
        id: "product-category-id",
        type: "combobox",
        placeholder: "Otros"
    }
];

export const productSchema = z.object({
    name: z.string().min(1, "El nombre es requerido"),
    price: z.number().min(0, "El precio debe ser mayor o igual a 0"),
    categoryId: z.number().min(1, "La categoría es requerida")
});