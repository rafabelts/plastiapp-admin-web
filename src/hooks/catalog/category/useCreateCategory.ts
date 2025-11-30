"use client";

import { CategoryService } from "@/src/infrastructure/services/CategoryService";
import { CreateCategoryModelType } from "@/src/models/catalog/category";
import { CreateCategory } from "@/src/usecases/catalog/category/CreateCategory";
import { useCallback, useMemo, useState } from "react";

export function useCreateCategory() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown>();

    const usecase = useMemo(() => {
        const service = new CategoryService();
        return new CreateCategory(service);
    }, []);

    const create = useCallback(
        async (payload: CreateCategoryModelType) => {

            setLoading(true);
            setError(null);

            try {
                return usecase.execute(payload)
            } catch (e) {
                setError(e)
            } finally {
                setLoading(true);
            }

        }, [usecase]
    );

    return { create, loading, error };
}
