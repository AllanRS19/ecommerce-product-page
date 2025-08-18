import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../store/cart.store";
import { cn } from "../lib/utils";
import { productImages } from "../constants";
import toast from "react-hot-toast";

const ProductAmountCounter = ({ counter, setCounter, isAddingToCart }: ProductAmountCounterProps) => (
    <div className="flex-center add-to-cart-counter">
        <button
            onClick={() => setCounter(counter - 1)}
            disabled={counter <= 0 || isAddingToCart}
            className="counter-action-btn"
        >
            <img src="/images/icon-minus.svg" alt="Minus Icon" className="counter-action-img" />
        </button>
        <p className="text-sm font-bold text-dark-blue">{counter}</p>
        <button
            onClick={() => setCounter(counter + 1)}
            className="counter-action-btn"
            disabled={isAddingToCart}
        >
            <img src="/images/icon-plus.svg" alt="Plus Icon" className="size-3" />
        </button>
    </div>
)

const AddToCart = ({ productInfo }: AddToCartProps) => {

    const { title, price, discountPercent = 0 } = productInfo;

    const [counter, setCounter] = useState(0);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    const { addItemToCart } = useCartStore();

    const handleAddItemToCart = async () => {

        if (counter <= 0) return console.log("Please select a quantity to continue");

        const customId = crypto.randomUUID();

        try {
            setIsAddingToCart(true);

            const finalPrice = discountPercent > 0 ? price * discountPercent : price;
    
            const cartItem = {
                cartItemId: customId,
                productTitle: title,
                quantity: counter,
                finalPrice,
                imageUrl: productImages[0].imageUrl
            }
    
            await new Promise((resolve) => setTimeout(resolve, 3000));
            addItemToCart(cartItem);

            toast.success(`The product "${title}" has been added to your cart`, {
                style: {
                    fontSize: "14px"
                }
            });

        } catch {
            toast.error("There was an error adding the item to your cart", {
                style: {
                    fontSize: "14px"
                }
            });
        } finally {
            setCounter(0);
            setIsAddingToCart(false);
        }
        
    }

    return (
        <div className="w-full flex flex-col gap-4 mt-6 lg:flex-row">
            <ProductAmountCounter
                counter={counter}
                setCounter={setCounter}
                isAddingToCart={isAddingToCart}
            />
            <button
                onClick={handleAddItemToCart}
                className="flex-center add-to-cart-btn"
                disabled={isAddingToCart || counter <= 0}
            >
                <ShoppingCart className={cn(
                    "size-4.5",
                    counter <= 0 && "hidden",
                    isAddingToCart && "animate-pulse"
                )} />
                <p className="text-sm font-bold">
                    {
                        isAddingToCart
                            ? "Adding to your cart..."
                            : "Add to cart"

                    }
                </p>
            </button>
        </div>
    )
}

export default AddToCart;