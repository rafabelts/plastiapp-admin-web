"use client";
import { ProductService } from "@/src/infrastructure/services/ProductService";
import { DeleteProduct } from "@/src/usecases/catalog/product/DeleteProduct";
import { useCallback, useMemo, useState } from "react";

export function useDeleteProduct() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);

    const usecase = useMemo(() => {
        const service = new ProductService();
        return new DeleteProduct(service);
    }, []);

    const remove = useCallback(
        async (id: number): Promise<void> => {
            setLoading(true);
            setError(null);
            try {
                await usecase.execute(id);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        },
        [usecase]
    );

    return { remove, loading, error }
}
