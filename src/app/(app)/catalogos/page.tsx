"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { CatalogTable } from "@/src/components/catalog-table";
import { useProducts } from "@/src/hooks/catalog/product/useProducts";
import { useDeleteProduct } from "@/src/hooks/catalog/product/useDeleteProduct";
import { useUpdateProduct } from "@/src/hooks/catalog/product/useUpdateProduct";
import { getProductColumns } from "@/src/config/columns/catalog/product";
import { useCategories } from "@/src/hooks/catalog/category/useCategories";
import { useState } from "react";
import { useDeleteCategory } from "@/src/hooks/catalog/category/useDeleteCategory";
import { useUpdateCategory } from "@/src/hooks/catalog/category/useUpdateCategory";
import { getCategoryColumns } from "@/src/config/columns/catalog/category";
import { usePlastics } from "@/src/hooks/catalog/plastic/usePlastics";
import { useDeletePlastic } from "@/src/hooks/catalog/plastic/useDeletePlastic";
import { useUpdatePlastic } from "@/src/hooks/catalog/plastic/useUpdatePlastic";
import { getPlasticColumns } from "@/src/config/columns/catalog/plastic";
import { useCreateProduct } from "@/src/hooks/catalog/product/useCreateProduct";
import { PRODUCT_FIELDS, productSchema } from "@/src/config/forms/PRODUCT_FIELDS";
import { useCreatePlastic } from "@/src/hooks/catalog/plastic/useCreatePlastic";
import { PLASTIC_FIELDS, plasticSchema } from "@/src/config/forms/PLASTIC_FIELDS";
import { useCreateCategory } from "@/src/hooks/catalog/category/useCreateCategory";
import { CATEGORY_FIELDS, categorySchema } from "@/src/config/forms/CATEGORY_FIELDS";

export default function CatalogsPage() {
    const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
    const { data: categories } = useCategories();

    const productFields = PRODUCT_FIELDS.map(field => {
        if (field.name === "categoryId") {
            return {
                ...field,
                options: categories || []
            };
        }
        return field;
    });

    return (
        <div className="flex flex-col">
            <Tabs defaultValue="product">
                <TabsList className="flex flex-row font-bold w-full justify-around items-center py-2 rounded-md [box-shadow:0_0.88px_1.75px_rgba(0,0,0,0.25),inset_0_0.88px_1.75px_rgba(0,0,0,0.25)] bg-transparent h-auto">
                    <TabsTrigger
                        value="product"
                        className="text-lg data-[state=active]:bg-[#17A252] data-[state=active]:text-white data-[state=active]:shadow-none px-3 py-1 rounded-md transition"
                    >
                        Productos
                    </TabsTrigger>
                    <TabsTrigger
                        value="plastic"
                        className="text-lg data-[state=active]:bg-[#17A252] data-[state=active]:text-white data-[state=active]:shadow-none px-3 py-1 rounded-md transition"
                    >
                        Plásticos
                    </TabsTrigger>
                    <TabsTrigger
                        value="categories"
                        className="text-lg data-[state=active]:bg-[#17A252] data-[state=active]:text-white data-[state=active]:shadow-none px-3 py-1 rounded-md transition"
                    >
                        Categorias
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="product">
                    <CatalogTable
                        useListAction={useProducts}
                        useDeleteAction={useDeleteProduct}
                        useUpdateAction={useUpdateProduct}
                        useCreateAction={useCreateProduct}
                        createFields={productFields}
                        createTitle="Crear Producto"
                        createSchema={productSchema}
                        getColumns={getProductColumns}
                        extraContext={{ categories: categories || [] }}
                        dataTable="productos"
                        isDialogOpen={isProductDialogOpen}
                        setIsDialogOpen={setIsProductDialogOpen}
                    />
                </TabsContent>
                <TabsContent value="plastic">
                    <CatalogTable
                        useListAction={usePlastics}
                        useDeleteAction={useDeletePlastic}
                        useUpdateAction={useUpdatePlastic}
                        useCreateAction={useCreatePlastic}
                        createFields={PLASTIC_FIELDS}
                        createTitle="Crear Plástico"
                        createSchema={plasticSchema}
                        getColumns={getPlasticColumns}
                        dataTable="plasticos"
                        isDialogOpen={isProductDialogOpen}
                        setIsDialogOpen={setIsProductDialogOpen}
                    />
                </TabsContent>
                <TabsContent value="categories">
                    <CatalogTable
                        useListAction={useCategories}
                        useDeleteAction={useDeleteCategory}
                        useUpdateAction={useUpdateCategory}
                        useCreateAction={useCreateCategory}
                        createFields={CATEGORY_FIELDS}
                        createTitle="Crear Categoría"
                        createSchema={categorySchema}
                        getColumns={getCategoryColumns}
                        dataTable="categorias"
                        isDialogOpen={isProductDialogOpen}
                        setIsDialogOpen={setIsProductDialogOpen}
                    />
                </TabsContent>
            </Tabs>
        </div>
    )
}