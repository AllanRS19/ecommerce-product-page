import { useState, type SetStateAction } from "react";
import { navLinks } from "../constants";
import { cn } from "../lib/utils";

interface MobileNavProps {
    open: boolean;
    setMobileNavOpen: (prev: SetStateAction<boolean>) => void;
}

const MobileNav = ({ open, setMobileNavOpen }: MobileNavProps) => {

    const [currentUrl, setCurrentUrl] = useState(window.location.hash || "");

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
                        <li
                            className={cn(
                                "cursor-pointer w-full font-bold",
                                currentUrl === link.url && "underline underline-offset-2 decoration-custom-orange"
                            )}
                            key={link.title}
                            onClick={() => setCurrentUrl(link.url)}
                        >
                            <a href={link.url}>{link.title}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}

export default MobileNav;