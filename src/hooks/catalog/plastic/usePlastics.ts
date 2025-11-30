"use client";

import { Plastic } from "@/src/domain/plastic/Plastic";
import { PlasticService } from "@/src/infrastructure/services/PlasticService";
import { GetPlastics } from "@/src/usecases/catalog/plastic/GetPlastics";
import { useCallback, useEffect, useMemo, useState } from "react";

export function usePlastics() {
    const [data, setData] = useState<Plastic[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>();

    const usecase = useMemo(() => {
        const service = new PlasticService();
        return new GetPlastics(service);
    }, []);

    const fetchAll = useCallback(async () => {
        if (!usecase) return;
        setLoading(true);
        setError(null);
        try {
            const plastics = await usecase.execute();
            setData(plastics);
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