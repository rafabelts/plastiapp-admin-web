"use client";
import { PlasticService } from "@/src/infrastructure/services/PlasticService";
import { DeletePlastic } from "@/src/usecases/catalog/plastic/DeletePlastic";
import { useCallback, useMemo, useState } from "react";

export function useDeletePlastic() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);

    const usecase = useMemo(() => {
        const service = new PlasticService();
        return new DeletePlastic(service);
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
