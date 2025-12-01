"use client"
import { CreateItemDialog } from "@/src/components/create-item-dialog";

export default function EventsPage() {
    return (
        <div>
            <h1>Eventos</h1>



            <CreateItemDialog
                isOpen={true}
                onClose={() => { }}
                fields={[]}
                useCreateAction={() => {
                    return {
                        create: async () => { },
                        loading: false,
                        error: ""
                    }
                }}
                title="Crear Evento"
            />
        </div>
    )
}