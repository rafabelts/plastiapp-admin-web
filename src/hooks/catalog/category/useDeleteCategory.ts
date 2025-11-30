"use client";
import { CategoryService } from "@/src/infrastructure/services/CategoryService";
import { DeleteCategory } from "@/src/usecases/catalog/category/DeleteCategory";
import { useCallback, useMemo, useState } from "react";

export function useDeleteCategory() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);

    const usecase = useMemo(() => {
        const service = new CategoryService();
        return new DeleteCategory(service);
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
