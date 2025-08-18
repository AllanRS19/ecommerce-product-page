import { useState, type SetStateAction } from "react";
import { navLinks } from "../constants";
import { cn } from "../lib/utils";
import CartDropdown from "./Cart";

interface NavbarProps {
    setMobileNavOpen: (prev: SetStateAction<boolean>) => void;
}

const Navbar = ({ setMobileNavOpen }: NavbarProps) => {

    const [currentUrl, setCurrentUrl] = useState(window.location.hash || "");

    return (
        <header className="w-full">
            <nav className="navbar">
                <div className="flex-center gap-8">
                    <div className="flex-center gap-4">
                        <img src="/images/icon-menu.svg" alt="Menu Icon" className="cursor-pointer lg:hidden" width={16} onClick={() => setMobileNavOpen((prev) => !prev)} />
                        <img src="/images/logo.svg" alt="App Logo" className="cursor-pointer" width={120} onClick={() => window.location.href = '/'} />
                    </div>
                    <ul className="nav-links">
                        {navLinks.map((link) => (
                            <li key={link.title} className={cn(
                                "flex-center nav-link-hover-effect",
                                currentUrl === link.url && "nav-link-active"
                            )}
                                onClick={() => setCurrentUrl(link.url)}
                            >
                                <a href={link.url}>{link.title}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex-center gap-6 lg:gap-8">
                    <CartDropdown />
                    <div className="avatar-container">
                        <img src="/images/image-avatar.png" alt="Avatar" className="size-6 lg:size-10 rounded-full object-cover" />
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar;