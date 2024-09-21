// cartHelper.tsx
export interface CartItemType {
    id: string;
    name: string;
    price: number;
    quantity: number;
    img: string;
}

const CART_KEY = 'cart';

const getCart = (): CartItemType[] => {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    } catch (error) {
        console.error("Failed to parse cart items:", error);
        return [];
    }
};

export const addItemToCart = (itemObj: CartItemType): void => {
    const cart = getCart();
    const productExists = cart.some((prod) => prod.id === itemObj.id);
    
    const updatedCart = productExists
        ? cart.map((prod) =>
            prod.id === itemObj.id ? { ...prod, quantity: prod.quantity + 1 } : prod
          )
        : [...cart, itemObj];

    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
};

export const removeItemFromCart = (itemId: string): void => {
    const cart = getCart();
    const updatedCart = cart.filter((prod) => prod.id !== itemId);
    
    if (updatedCart.length !== cart.length) {
        localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
    }
};

export const increaseItemQuantity = (itemId: string): void => {
    const cart = getCart();
    const updatedCart = cart.map((prod) =>
        prod.id === itemId ? { ...prod, quantity: prod.quantity + 1 } : prod
    );
    
    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
};

export const decreaseItemQuantity = (itemId: string): void => {
    const cart = getCart();
    const updatedCart = cart.map((prod) => {
        if (prod.id === itemId) {
            return prod.quantity > 1
                ? { ...prod, quantity: prod.quantity - 1 }
                : null; 
        }
        return prod;
    }).filter(Boolean) as CartItemType[]; 

    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
};

export const getCartItems = (): CartItemType[] => {
    return getCart();
};

export const clearCartItems = (): void => {
    localStorage.removeItem(CART_KEY);
};
