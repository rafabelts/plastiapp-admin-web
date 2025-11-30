import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu";
import { Combobox } from "@/src/components/combobox";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Category } from "@/src/domain/category/Category";
import { Product } from "@/src/domain/product/Product";
import { ColumnDef } from "@tanstack/react-table";
import { Check, MoreVerticalIcon, Pencil, Trash, X } from "lucide-react";

export function getProductColumns(ctx: {
    editingId: number | null;
    draft: Record<number, Product>;
    onChange: (id: number, key: keyof Product, value: string | number) => void;
    onEdit: (row: Product) => void;
    onSave: (id: number) => void;
    onCancel: () => void;
    onDelete: (row: Product) => void;
    categories: Category[]
}): ColumnDef<Product>[] {
    return [
        {
            accessorKey: "name",
            header: "Nombre",
            cell: ({ row }) => {
                const id = row.original.id;
                const isEditing = ctx.editingId === id;
                if (!isEditing) return <span>{row.original.name}</span>;

                const initialValue = ctx.draft[id]?.name ?? row.original.name

                if (isEditing) {
                    return (
                        <Input
                            className="border rounded px-2 py-1 w-full"
                            defaultValue={initialValue}
                            onBlur={(e) => ctx.onChange(row.original.id, "name", e.target.value)}
                        />
                    );
                }
            }
        },
        {
            accessorKey: "price",
            header: "Precio",
            cell: ({ row }) => {
                const id = row.original.id;
                const isEditing = ctx.editingId === id;
                if (!isEditing) return <span>{row.original.price}</span>;

                const initialValue = ctx.draft[id]?.price ?? row.original.price

                if (isEditing) {
                    return (
                        <Input
                            className="border rounded px-2 py-1 w-full"
                            defaultValue={initialValue}
                            onBlur={(e) => ctx.onChange(row.original.id, "price", e.target.value)}
                        />
                    );
                }
            }
        },
        {
            accessorKey: "category",
            header: "Categoria",
            cell: ({ row }) => {
                const id = row.original.id;
                const isEditing = ctx.editingId === id;

                if (!isEditing) return <span>{row.original.category}</span>;
                const initialValue = ctx.draft[id]?.categoryId ?? row.original.categoryId;

                return (
                    <Combobox
                        elements={ctx.categories}
                        value={initialValue}
                        onChange={(newValue) =>
                            ctx.onChange(row.original.id, "categoryId", newValue!)
                        }
                    />
                );
            },
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const isEditing = ctx.editingId === row.original.id;

                if (isEditing) {
                    return (
                        <div className="flex gap-2 justify-end">
                            <Button size="icon" variant="ghost" onClick={() => ctx.onSave(row.original.id)}>
                                <Check className="w-4 h-4 text-green-600" />
                            </Button>
                            <Button size="icon" variant="ghost" onClick={ctx.onCancel}>
                                <X className="w-4 h-4 text-red-600" />
                            </Button>
                        </div>
                    );
                }

                return (
                    <div className="flex justify-end">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <MoreVerticalIcon className="w-4 h-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => ctx.onEdit(row.original)}>
                                    <Pencil className="mr-2 w-4 h-4" />
                                    Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => ctx.onDelete(row.original)}>
                                    <Trash className="mr-2 w-4 h-4" />
                                    Borrar
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                );
            }
        }
    ]
}