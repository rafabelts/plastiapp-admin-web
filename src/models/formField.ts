export type FormFieldConfig<T> = {
    name: keyof T; // Se adapta dinámicamente a las llaves del modelo que le pases
    label: string;
    id: string;
    type: string;
    placeholder: string;
    options?: { id: number; name: string }[];
};