"use client";

import { Category } from "@/src/domain/category/Category";
import { CategoryService } from "@/src/infrastructure/services/CategoryService";
import { GetCategories } from "@/src/usecases/catalog/category/GetCategories";
import { useCallback, useEffect, useMemo, useState } from "react";

export function useCategories() {
    const [data, setData] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>();

    const usecase = useMemo(() => {
        const service = new CategoryService();
        return new GetCategories(service);
    }, []);

    const fetchAll = useCallback(async () => {
        if (!usecase) return;
        setLoading(true);
        setError(null);
        try {
            const categories = await usecase.execute();
            setData(categories);
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }, [usecase]);

    useEffect(() => {
        fetchAll();
    }, [fetchAll]);

    return { data, loading, error, refetch: fetchAll };
}