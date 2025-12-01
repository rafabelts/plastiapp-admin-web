import z from "zod";

export const CreateEventModel = z.object({
    name: z.string().min(1, { message: "Ingresa el nombre del evento" }),

})