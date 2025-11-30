"use client";
import { CategoryService } from "@/src/infrastructure/services/CategoryService";
import { CreateCategoryModelType } from "@/src/models/catalog/category";
import { UpdateCategory } from "@/src/usecases/catalog/category/UpdateCategory";
import { useCallback, useMemo, useState } from "react";

export function useUpdateCategory() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);

    const usecase = useMemo(() => {
        const service = new CategoryService();
        return new UpdateCategory(service);
    }, []);

    const update = useCallback(
        async (id: number, payload: Partial<CreateCategoryModelType>): Promise<void> => {
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
