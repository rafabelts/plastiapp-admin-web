"use client";

import { ProductService } from "@/src/infrastructure/services/ProductService";
import { CreateProductModelType } from "@/src/models/catalog/product";
import { CreateProduct } from "@/src/usecases/catalog/product/CreateProduct";
import { useCallback, useMemo, useState } from "react";

export function useCreateProduct() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown>();

    const usecase = useMemo(() => {
        const service = new ProductService();
        return new CreateProduct(service);
    }, []);

    const create = useCallback(
        async (payload: CreateProductModelType) => {

            setLoading(true);
            setError(null);

            try {
                await usecase.execute(payload)
            } catch (e) {
                setError(e)
            } finally {
                setLoading(false);
            }

        }, [usecase]
    );

    return { create, loading, error };
}
