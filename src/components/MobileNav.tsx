import type { SetStateAction } from "react";
import { navLinks } from "../constants";
import { cn } from "../lib/utils";

interface MobileNavProps {
    open: boolean;
    setMobileNavOpen: (prev: SetStateAction<boolean>) => void;
}

const MobileNav = ({ open, setMobileNavOpen }: MobileNavProps) => {
    return (
        <aside className={cn(
            "mobile-nav-overlay",
            open && "overlay-shown"
            )}
            onClick={() => setMobileNavOpen(false)}
        >
            <nav className={cn(
                "mobile-nav",
                open && "mobile-nav-shown"
                )}
            >
                <img src="/images/icon-close.svg" alt="Close icon" className="size-3 cursor-pointer" onClick={() => setMobileNavOpen(false)} />
                <ul className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <li className="cursor-pointer w-full font-bold" key={link.title}>
                            <a href={link.url}>{link.title}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}

export default MobileNav;