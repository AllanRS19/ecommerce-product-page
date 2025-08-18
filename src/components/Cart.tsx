import { useEffect, useRef, useState } from "react";
import { useCartStore } from "../store/cart.store";
import { Trash } from "lucide-react";
import { cn, formatPrice } from "../lib/utils";
import toast from "react-hot-toast";

const CartDropdown = () => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCompletingCheckout, setIsCompletingCheckout] = useState(false);
    const cartDropdownRef = useRef<HTMLDivElement | null>(null);
    const cartDropdownTriggerRef = useRef<HTMLImageElement | null>(null);

    const { cartItemsCount, cartItems, removeItemsFromCart, checkoutCompleted } = useCartStore();

    const handleCompleteCheckout = async () => {
        try {
            setIsCompletingCheckout(true);
            await new Promise((resolve) => setTimeout(resolve, 3000));
            checkoutCompleted();
            setIsCartOpen(false);
            toast.success("You have successfully completed checkout. Enjoy your purchase!", {
                style: {
                    fontSize: "14px"
                }
            });
        } catch {
            toast.error("An error occurred", {
                style: {
                    fontSize: "14px"
                }
            });
        } finally {
            setIsCompletingCheckout(false);
        }
    }

    const handleRemoveItemFromCart = (cartItemId: string, productTile: string) => {
        removeItemsFromCart(cartItemId);
        toast.success(`The item "${productTile} has been successfully deleted from your cart"`, {
            style: {
                fontSize: "14px"
            }
        });
    }

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
            {cartItemsCount > 0 && (
                <div className="cart-count-badge">
                    <p className="text-[9px] text-white font-bold">{cartItemsCount}</p>
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
                        cartItemsCount <= 0 && "flex items-center justify-center"
                    )}
                >
                    {cartItemsCount > 0 ? (
                        <div className="w-full flex flex-col gap-6">
                            <ul className="w-full flex flex-col gap-6">
                                {cartItems?.map((item) => {

                                    const totalPrice = item.finalPrice * item.quantity;

                                    return (
                                        <li key={item.cartItemId} className="cart-item">
                                            <img
                                                src={item.imageUrl}
                                                alt={item.productTitle}
                                                className="size-10 object-cover rounded-sm"
                                            />
                                            <div className="flex-1 truncate flex flex-col">
                                                <p className="text-sm text-dark-grayish-blue truncate">{item.productTitle}</p>
                                                <p className="text-sm text-dark-grayish-blue">{formatPrice(item.finalPrice)} * {item.quantity} <span className="text-dark-blue font-bold ml-1">{formatPrice(totalPrice)}</span></p>
                                            </div>
                                            <Trash
                                                className="size-4 cursor-pointer text-dark-grayish-blue"
                                                onClick={() => !isCompletingCheckout && handleRemoveItemFromCart(item.cartItemId, item.productTitle)}
                                            />
                                        </li>
                                    )
                                })}
                            </ul>
                            <button
                                className={cn(
                                    "checkout-button",
                                )}
                                disabled={isCompletingCheckout}
                                onClick={handleCompleteCheckout}
                            >
                                {isCompletingCheckout ? "Checking out..." : "Check out"}
                            </button>
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