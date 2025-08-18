import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { cn } from "../lib/utils";

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

const AddToCart = ({ productName }: AddToCartProps) => {

    const [counter, setCounter] = useState(0);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    const handleAddItemToCart = () => {
        if (counter <= 0) return console.log("Number is negative or equal to 0");

        console.log("We are processing");
        setIsAddingToCart(true);

        setTimeout(() => {
            setIsAddingToCart(false);
            setCounter(0);
            console.log("Items added successfully", productName);
        }, 5000);
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