import z from "zod";

export type CreateProductModelType = z.infer<typeof CreateProductModel>;

export const CreateProductModel = z.object({
    name: z
        .string()
        .min(1, { message: "Ingresa el nombre del producto" }),
    price: z.coerce.number().min(1, { message: "Ingresa el precio del articulo" }),
    categoryId: z.coerce.number()
});
