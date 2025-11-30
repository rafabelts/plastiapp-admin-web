"use client";

import { Product } from "@/src/domain/product/Product";
import { ProductService } from "@/src/infrastructure/services/ProductService";
import { GetProducts } from "@/src/usecases/catalog/product/GetProducts";
import { useCallback, useEffect, useMemo, useState } from "react";

export function useProducts() {
    const [data, setData] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>();

    const usecase = useMemo(() => {
        const service = new ProductService();
        return new GetProducts(service);
    }, []);

    const fetchAll = useCallback(async () => {
        if (!usecase) return;
        setLoading(true);
        setError(null);
        try {
            const products = await usecase.execute();
            setData(products);

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
