import { FormFieldConfig } from "@/src/models/formField";
import { LogInModelType } from "@/src/models/logIn";

export const AUTH_FIELDS: FormFieldConfig<LogInModelType>[] = [
    {
        name: "email",
        label: "Correo electrónico",
        id: "auth-email",
        type: "email",
        placeholder: "admin@braskem.com",
    },
    {
        name: "password",
        label: "Contraseña",
        id: "auth-password",
        type: "password",
        placeholder: "••••••",
    },
];