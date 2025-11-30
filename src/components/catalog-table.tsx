"use client";
import { useRowEditing } from "@/src/hooks/useRowEditing";
import { DataTable } from "./dataTable";
import { ColumnDef } from "@tanstack/react-table";
import { CreateItemDialog } from "./create-item-dialog";
import { FormFieldConfig } from "../models/formField";
import { ZodType } from "zod";

interface BaseEntity {
    id: number;
}

interface CatalogTableProps<T extends BaseEntity, TContext = unknown> {
    useListAction: () => { data: T[]; loading: boolean; error?: unknown; refetch: () => Promise<void> };
    useDeleteAction: () => { remove: (id: number) => Promise<void> };
    useUpdateAction: () => { update: (id: number, data: T) => Promise<void> };
    getColumns: (ctx: {
        editingId: number | null;
        draft: Record<number, T>;
        onChange: (id: number, key: keyof T, value: string | number) => void;
        onEdit: (row: T) => void;
        onSave: (id: number) => void;
        onCancel: () => void;
        onDelete: (row: T) => void;
    } & TContext) => ColumnDef<T>[];
    extraContext?: TContext;
    dataTable: "productos" | "plasticos" | "categorias";
    isDialogOpen: boolean;
    setIsDialogOpen: (open: boolean) => void;
    createFields?: FormFieldConfig<any>[];
    createTitle?: string;
    useCreateAction?: () => { create: (data: any) => Promise<any>; loading: boolean; error?: unknown };
    createSchema?: ZodType<any>;
}

export function CatalogTable<T extends BaseEntity, TContext>({
    useListAction,
    useDeleteAction,
    useUpdateAction,
    getColumns,
    extraContext,
    dataTable,
    isDialogOpen,
    setIsDialogOpen,
    createFields,
    createTitle,
    useCreateAction,
    createSchema
}: CatalogTableProps<T, TContext>) {
    const { data, refetch } = useListAction();
    const { remove } = useDeleteAction();
    const { update } = useUpdateAction();
    const { editingId, draft, onEdit, onChange, onCancel, onSave } = useRowEditing<T>();

    const handleSave = (id: number) => {
        onSave(id, async (item: T) => {
            await update(id, item);
            await refetch();
        });
    };

    const handleDelete = async (row: T) => {
        if (confirm("¿Seguro?")) {
            await remove(row.id);
            await refetch();
        }
    };

    const columns = getColumns({
        editingId,
        draft,
        onChange: (id, key, value) => onChange(id, key as keyof T, value),
        onEdit,
        onSave: handleSave,
        onCancel,
        onDelete: handleDelete,
        ...(extraContext as TContext)
    });

    return (
        <>
            <DataTable
                columns={columns}
                data={data}
                refetch={refetch}
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
                dataTable={dataTable}
            />
            {useCreateAction && createFields && (
                <CreateItemDialog
                    isOpen={isDialogOpen}
                    onClose={() => {
                        setIsDialogOpen(false);
                        refetch();
                    }}
                    fields={createFields}
                    useCreateAction={useCreateAction}
                    title={createTitle || "Crear nuevo elemento"}
                    schema={createSchema}
                />
            )}
        </>
    );
}
