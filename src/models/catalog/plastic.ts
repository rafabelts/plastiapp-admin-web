import z from "zod";

export type CreatePlasticModelType = z.infer<typeof CreatePlasticModel>;

export const CreatePlasticModel = z.object({
    name: z
        .string()
        .min(1, { message: "Ingresa el nombre del producto" }),
    price: z.coerce.number().min(1, { message: "Ingresa el precio del articulo" }),
});
