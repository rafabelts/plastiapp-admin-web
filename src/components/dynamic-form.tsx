"use client";

import { useForm, FieldValues, SubmitHandler, Controller } from "react-hook-form";
import { FormFieldConfig } from "@/src/models/formField";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Loader2 } from "lucide-react";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { Combobox } from "@/src/components/combobox";

import { ZodType } from "zod";

interface DynamicFormProps<T extends FieldValues> {
    fields: FormFieldConfig<T>[];
    onSubmit: (data: T) => Promise<void>;
    loading?: boolean;
    error?: unknown;
    submitLabel?: string;
    schema?: ZodType<any>;
}

export function DynamicForm<T extends FieldValues>({
    fields,
    onSubmit,
    loading,
    error,
    submitLabel = "Guardar",
    schema
}: DynamicFormProps<T>) {
    const { register, handleSubmit, control, formState: { errors } } = useForm<T>({
        resolver: schema ? zodResolver(schema as any) : undefined
    });

    return (
        <form onSubmit={handleSubmit(onSubmit as SubmitHandler<T>)} >
            <FieldGroup>
                {fields.map((field) => (
                    <Field key={String(field.name)}>
                        <FieldLabel htmlFor={field.id}>
                            {field.label}
                        </FieldLabel>

                        {field.type === 'combobox' ? (
                            <Controller
                                control={control}
                                name={field.name as any}
                                render={({ field: { onChange, value } }) => (
                                    <Combobox
                                        elements={field.options || []}
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                        ) : (
                            <Input
                                id={field.id}
                                type={field.type}
                                placeholder={field.placeholder}
                                {...register(field.name as any, {
                                    valueAsNumber: field.type === 'number'
                                })}
                            />
                        )}

                        {/* Renderizado dinámico de errores */}
                        {errors[field.name as any] && (
                            <FieldError>
                                {errors[field.name as any]?.message as string}
                            </FieldError>
                        )}
                    </Field>
                ))}

                {!!error && (
                    <div className="text-sm text-red-500 mt-2">
                        {error instanceof Error ? error.message : "Ocurrió un error al guardar."}
                    </div>
                )}

                <Button type="submit" disabled={loading} className="mt-4 w-full">
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {submitLabel}
                </Button>

            </FieldGroup>
        </form>
    );
}
