import { IconName } from "lucide-react/dynamic";

export type NavItem = {
    label: string;
    href: string;
    icon: IconName;
    btnLabel: string | undefined;
};

export const NAV_ITEMS: NavItem[] = [
    {
        label: "Inicio",
        href: "/",
        icon: "home",
        btnLabel: "Ver eventos"
    },
    {
        label: "Eventos",
        href: "/eventos",
        icon: "calendar",
        btnLabel: "Crear evento"
    },
    {
        label: "Catálogos",
        href: "/catalogos",
        icon: "notebook",
        btnLabel: undefined
    },
];
