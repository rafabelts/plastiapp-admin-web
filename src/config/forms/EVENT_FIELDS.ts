import { CreateEventModelType } from "@/src/models/catalog/event";
import { FormFieldConfig } from "@/src/models/formField";


export const EVENT_FIELDS: FormFieldConfig<CreateEventModelType>[] = [
    {
        name: "name",
        label: "Nombre del evento",
        id: "event-name",
        type: "text",
        placeholder: "Plastitrueque"
    },
    {
        name: "address",
        label: "Dirección",
        id: "event-address",
        type: "text",
        placeholder: "Calle 123, Colonia..."
    },
    {
        name: "city",
        label: "Ciudad",
        id: "event-city",
        type: "text",
        placeholder: "Ciudad de México"
    },
    {
        name: "state",
        label: "Estado",
        id: "event-state",
        type: "text",
        placeholder: "CDMX"
    },
    {
        name: "startDate",
        label: "Fecha de inicio",
        id: "event-start-date",
        type: "datetime-local",
        placeholder: ""
    },
    {
        name: "endDate",
        label: "Fecha de fin",
        id: "event-end-date",
        type: "datetime-local",
        placeholder: ""
    },
    {
        name: "eventType",
        label: "Tipo de evento",
        id: "event-type",
        type: "combobox",
        placeholder: "Selecciona el tipo",
        options: [
            { id: "ESCOLAR", name: "Escolar" },
            { id: "GENERAL", name: "General" }
        ]
    },
    {
        name: "goal",
        label: "Meta",
        id: "event-goal",
        type: "text",
        placeholder: "Meta del evento"
    }
]