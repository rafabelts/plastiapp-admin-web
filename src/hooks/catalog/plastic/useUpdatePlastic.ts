"use client";

import { PlasticService } from "@/src/infrastructure/services/PlasticService";
import { CreatePlasticModelType } from "@/src/models/catalog/plastic";
import { UpdatePlastic } from "@/src/usecases/catalog/plastic/UpdatePlastic";
import { useCallback, useMemo, useState } from "react";

export function useUpdatePlastic() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);

    const usecase = useMemo(() => {
        const service = new PlasticService();
        return new UpdatePlastic(service);
    }, []);

    const update = useCallback(
        async (id: number, payload: Partial<CreatePlasticModelType>): Promise<void> => {
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
