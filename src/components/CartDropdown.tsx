import { useEffect, useRef, useState } from "react";
import { productImages } from "../constants";
import { Trash } from "lucide-react";
import { cn } from "../lib/utils";

const CartDropdown = () => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartCount, setCartCount] = useState(2);
    const cartDropdownRef = useRef<HTMLDivElement | null>(null);
    const cartDropdownTriggerRef = useRef<HTMLImageElement | null>(null);
    const items: Images[] = productImages;

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (cartDropdownRef.current && cartDropdownTriggerRef.current && !cartDropdownRef.current.contains(e.target as Node) && !cartDropdownTriggerRef.current.contains(e.target as Node)) {
                setIsCartOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="cart-dropdown-container">
            {cartCount > 0 && (
                <div className="cart-count-badge">
                    <p className="text-[9px] text-white font-bold">{cartCount}</p>
                </div>
            )}
            <img
                src="/images/icon-cart.svg"
                alt="Shopping Cart"
                className="cursor-pointer size-5"
                onClick={() => setIsCartOpen((prev) => !prev)}
                ref={cartDropdownTriggerRef}
            />
            <div
                className={cn(
                    "cart-dropdown",
                    isCartOpen && "cart-dropdown-visible"
                )}
                ref={cartDropdownRef}
            >
                <div className="cart-dropdown-title">
                    <h3 className="text-dark-blue text-sm font-bold">Cart</h3>
                </div>
                <div className="separator" />
                <div
                    className={cn(
                        "cart-content",
                        cartCount <= 0 && "flex items-center justify-center"
                    )}
                >
                    {cartCount > 0 ? (
                        <div className="w-full flex flex-col gap-6">
                            <ul className="w-full flex flex-col gap-6">
                                {items.map((item) => (
                                    <li key={item.imageId} className="cart-item">
                                        <img
                                            src={item.imageUrl}
                                            alt="Image"
                                            className="size-10 object-cover rounded-sm"
                                        />
                                        <div className="flex-1 truncate flex flex-col">
                                            <p className="text-sm text-dark-grayish-blue truncate">Fall Limited Edition Sneakers dfjkldjfd</p>
                                            <p className="text-sm text-dark-grayish-blue">$125.00 * 3 <span className="text-dark-blue font-bold">$375.00</span></p>
                                        </div>
                                        <Trash className="size-4 cursor-pointer text-dark-grayish-blue" onClick={() => { }} />
                                    </li>
                                ))}
                            </ul>
                            <button className="checkout-button">Checkout</button>
                        </div>
                    ) : (
                        <p className="text-sm font-bold text-dark-grayish-blue">Your cart is empty.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CartDropdown;