"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/src/components/ui/dialog";
import { DynamicForm } from "./dynamic-form";
import { FormFieldConfig } from "@/src/models/formField";

import { ZodType } from "zod";

interface CreateItemDialogProps<T> {
    isOpen: boolean;
    onClose: () => void;
    fields: FormFieldConfig<T>[];
    useCreateAction: () => {
        create: (data: T) => Promise<any>;
        loading: boolean;
        error?: unknown;
    };
    title: string;
    schema?: ZodType<any>;
}

export function CreateItemDialog<T extends Record<string, any>>({
    isOpen,
    onClose,
    fields,
    useCreateAction,
    title,
    schema
}: CreateItemDialogProps<T>) {
    const { create, loading, error } = useCreateAction();

    const handleSubmit = async (data: T) => {
        await create(data);
        if (!error) {
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <DynamicForm
                    fields={fields}
                    onSubmit={handleSubmit}
                    loading={loading}
                    error={error}
                    submitLabel="Crear"
                    schema={schema}
                />
            </DialogContent>
        </Dialog>
    );
}
