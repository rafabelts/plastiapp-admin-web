import z from "zod";

export type CreateCategoryModelType = z.infer<typeof CreateCategoryModel>;

export const CreateCategoryModel = z.object({
    name: z
        .string()
        .min(1, { message: "Ingresa el nombre del producto" }),
});
