"use client";
import { useState } from "react";

interface BaseEntity {
    id: number;
}

export function useRowEditing<T extends BaseEntity>() {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [draft, setDraft] = useState<Record<number, T>>({});

    const onEdit = (row: T) => {
        setEditingId(row.id);
        setDraft((prev) => ({ ...prev, [row.id]: { ...row } }));
    };

    const onCancel = () => {
        setEditingId(null);
        setDraft({});
    };

    const onChange = (id: number, key: keyof T, value: string | number) => {
        setDraft((prev) => {
            const currentDraft = prev[id];
            if (!currentDraft) return prev;

            return {
                ...prev,
                [id]: { ...currentDraft, [key]: value },
            };
        });
    };

    const onSave = (id: number, saveAction: (data: T) => Promise<void>) => {
        const itemToSave = draft[id];
        if (itemToSave) {
            saveAction(itemToSave).then(() => {
                onCancel();
            });
        }
    };

    return {
        editingId,
        draft,
        onEdit,
        onCancel,
        onChange,
        onSave,
    };
}
