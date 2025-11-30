import Link from "next/link";
import { DynamicIcon, iconNames, type IconName } from "lucide-react/dynamic";

export type NavBarItemProps = {
    icon: IconName,
    label: string,
    isActive?: boolean,
    href: string,
}

export function NavBarElement({
    icon,
    label,
    isActive = true,
    href,
}: NavBarItemProps) {

    return (
        <Link
            href={href}
            className={`flex flexcol gap-1 cursor-pointer group`}
        >
            <div className={`flex flex-row items-center gap-3 transition-all duration-200 group-hover:-translate-y-[2px] ${isActive ? "text-blue-500/80" : "text-gray-400"}`}>
                <DynamicIcon name={icon} size={30} />
                <p className="font-semibold text-xl" >
                    {label}
                </p>
            </div>
            <hr
                className={`border-[2px] rounded-[4px] transition-all duration-300 ${isActive ? "hidden" : "border-blue-500/80 w-0 group-hover:w-full"
                    }`}
            />
        </Link>
    );
}

