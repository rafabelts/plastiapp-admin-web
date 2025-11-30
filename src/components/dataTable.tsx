"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/src/components/ui/table"
import { useState } from "react";
// import { CreateProduct } from "./catalogs/dialogs/create-product";
// import { Button } from "./button";
import { Download, PlusIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { exportTableToXlsx } from "../lib/exporTableToXlsx";
// import { CreatePlastic } from "./catalogs/dialogs/create-plastic";
// import { CreateCategory } from "./catalogs/dialogs/create-category";
// import { Input } from "./input";
// import { exportTableToXlsx } from "@/utils/export-table-to-xlsx";

import moment from "moment";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    useListAction?: () => {
        data: TData[];
        loading: boolean;
        error?: unknown;
        refetch: () => Promise<void>;
    };
    data?: TData[];
    refetch?: () => Promise<void>;
    isDialogOpen: boolean;
    setIsDialogOpen: (isOpen: boolean) => void;
    dataTable: "productos" | "plasticos" | "categorias",
}

export function DataTable<TData, TValue>({
    columns,
    useListAction,
    data: providedData,
    refetch: providedRefetch,
    isDialogOpen,
    setIsDialogOpen,
    dataTable
}: DataTableProps<TData, TValue>) {

    const listAction = useListAction ? useListAction() : undefined;
    const data = providedData ?? listAction?.data ?? [];
    const refetch = providedRefetch ?? listAction?.refetch ?? (async () => { });

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            columnVisibility
        },
    })

    return (
        <div className="overflow-hidden w-full p-2">
            <div className="flex justify-between">
                <Input
                    placeholder="Buscar"

                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="w-sm"
                />

                <div className="flex gap-5">
                    <Button variant="ghost" onClick={
                        () => {
                            exportTableToXlsx(table, dataTable.toLowerCase(), `${dataTable.toUpperCase()}_${moment().format("YYYY_MM_DD_HH_mm_ss")}`)
                        }
                    }>
                        <Download />
                        Exportar a excel
                    </Button>

                    <Button onClick={() => setIsDialogOpen(true)}>
                        <PlusIcon className="w-6 h-6" />
                        Añadir
                    </Button>
                </div>
            </div>

            <Table key={data.length} className="mt-4 items-center justify-center">
                <TableHeader className="bg-gray-50">
                    {
                        table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className="text-gray-600 font-semibold text-md uppercase tracking-wider"
                                        >
                                            {
                                                header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )
                                            }
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))
                    }
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                className="hover:bg-gray-50 transition-colors"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        key={cell.id}
                                        className="text-gray-800"
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center text-gray-500"
                            >
                                No se encontraron resultados
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}