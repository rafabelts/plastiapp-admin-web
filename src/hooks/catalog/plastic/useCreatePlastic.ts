"use client";

import { PlasticService } from "@/src/infrastructure/services/PlasticService";
import { CreatePlasticModelType } from "@/src/models/catalog/plastic";
import { CreatePlastic } from "@/src/usecases/catalog/plastic/CreatePlastic";
import { useCallback, useMemo, useState } from "react";

export function useCreatePlastic() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown>();

    const usecase = useMemo(() => {
        const service = new PlasticService();
        return new CreatePlastic(service);
    }, []);

    const create = useCallback(
        async (payload: CreatePlasticModelType) => {

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
