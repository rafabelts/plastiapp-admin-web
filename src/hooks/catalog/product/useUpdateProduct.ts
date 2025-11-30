"use client";
import { ProductService } from "@/src/infrastructure/services/ProductService";
import { CreateProductModelType } from "@/src/models/catalog/product";
import { UpdateProduct } from "@/src/usecases/catalog/product/UpdateProduct";
import { useCallback, useMemo, useState } from "react";

export function useUpdateProduct() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);

    const usecase = useMemo(() => {
        const service = new ProductService();
        return new UpdateProduct(service);
    }, []);

    const update = useCallback(
        async (id: number, payload: Partial<CreateProductModelType>): Promise<void> => {
            setLoading(true);
            setError(null);
            try {
                await usecase.execute(id, payload);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        },
        [usecase]
    );

    return { update, loading, error }
}
