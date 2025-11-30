import { usePathname } from "next/navigation";
import { NavBarElement, NavBarItemProps } from "./navbarElement";
import { Button } from "../button";
import { NAV_ITEMS } from "@/src/config/navigation/navigation";
import { ProfileElement } from "./profileElement";

export function NavBar() {
    const path = usePathname();

    const activeItem = NAV_ITEMS.find(item => item.href === path);

    return (
        <nav
            className="flex flex-row w-full shadow-[0_1px_2px_0_rgba(0,0,0,0.15)] items-center p-4 justify-between"
        >
            <ProfileElement username="Jhon" />

            <div className="flex flex-row gap-80">
                {
                    NAV_ITEMS.map((item, i) => (
                        <NavBarElement
                            key={i}
                            {...item}
                            isActive={path === item.href}
                        />
                    ))
                }
            </div>

            <Button
                onClick={() => { }}
                className={activeItem?.btnLabel ? 'text-xl p-5' : 'opacity-0 pointer-events-none'}
            >
                {activeItem?.btnLabel}
            </Button>
        </nav>
    );
}