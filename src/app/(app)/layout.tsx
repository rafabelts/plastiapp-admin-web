"use client";

import { NavBar } from "@/src/components/ui/navbar/navbar";
import "../globals.css";
import { usePathname } from "next/navigation";
import { NO_NAVBAR_ROUTES } from "@/src/config/navigation/routes";

export default function AppLayout({ children }: { children: React.ReactNode }) {

    const path = usePathname();
    const showNavbar = !NO_NAVBAR_ROUTES.includes(path);

    return (
        <div className="min-h-screen flex flex-col">
            {showNavbar && <NavBar />}
            <main className="flex-1 p-6">{children}</main>
        </div>
    );
}
