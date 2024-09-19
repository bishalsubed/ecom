
export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export const addItemToCart = (itemObj: CartItem): void => {
    let cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(itemObj);
    localStorage.setItem('cart', JSON.stringify(cart));
};

export const removeItemFromCart = (itemId:string): void => {
    let cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = cart.filter((prod)=> prod.id != itemId)
    if (updatedCart.length !== cart.length) {
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
}

export const getCartItems = (): CartItem[] => {
    return JSON.parse(localStorage.getItem('cart') || '[]');
};

export const clearCartItems = () => {
    localStorage.clear()
    return
}


