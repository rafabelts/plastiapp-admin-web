import z from "zod";

export type LogInModelType = z.infer<typeof LogInModel>;

export const LogInModel = z.object({
    email: z.email({ message: "Ingresa un correo electrónico válido" })
        .min(1, { message: "Ingresa tu correo electrónico" }),
    password: z.string().min(1, { message: "Ingresa tu contraseña" })
})