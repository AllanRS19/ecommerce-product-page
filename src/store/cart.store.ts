import { create } from 'zustand'

interface ProductInfoDetails {
    cartItemId: string;
    productTitle: string;
    quantity: number;
    finalPrice: number;
    imageUrl: string;
}

type UseCartStoreProps = {
    cartItemsCount: number;
    cartItems: ProductInfoDetails[] | [];
    addItemToCart: (cartItem: ProductInfoDetails) => void;
    removeItemsFromCart: (cartId: string) => void;
    checkoutCompleted: () => void;
}

export const useCartStore = create<UseCartStoreProps>((set, get) => ({
    cartItemsCount: 0,
    cartItems: [],
    addItemToCart: (cartItem: ProductInfoDetails) => {

        const { cartItems } = get();

        const cartItemExists = cartItems.find((item) => item.cartItemId === cartItem.cartItemId);

        if (cartItemExists) {
            const updatedCart = cartItems.map((item) =>
                item.cartItemId === cartItem.cartItemId
                    ? { ...item, quantity: cartItem.quantity }
                    : item
            );

            set(() => ({
                cartItems: updatedCart
            }))
        } else {
            set(() => ({
                cartItemsCount: cartItems.length + 1, 
                cartItems: [...cartItems, cartItem]
            }));
        }
    },
    removeItemsFromCart: (cartId: string) => {

        const { cartItems } = get();

        const filteredCart = cartItems.filter((cartItem) => cartItem.cartItemId !== cartId);

        set(() => ({
            cartItemsCount: filteredCart.length, cartItems: filteredCart
        }));
    },
    checkoutCompleted: () => {
        set(() => ({ cartItemsCount: 0, cartItems: [] }));
    }
}));