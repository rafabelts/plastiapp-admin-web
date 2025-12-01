import z from "zod";

export type CreateEventModelType = z.infer<typeof CreateEventModel>;

export const CreateEventModel = z.object({
    name: z.string().min(1, { message: "Ingresa el nombre del evento" }),
    address: z.string().min(1, { message: "Ingresa la dirección del evento" }),
    city: z.string().min(1, { message: "Ingresa la ciudad del evento" }),
    state: z.string().min(1, { message: "Ingresa el estado del evento" }),
    startDate: z.string().min(1, { message: "Ingresa la hora de inicio del evento" }),
    endDate: z.string().min(1, { message: "Ingresa la hora de fin del evento" }),
    eventType: z.enum(["ESCOLAR", "GENERAL"] as const),
    goal: z.string().min(1, { message: "Ingresa la meta del evento" })
})