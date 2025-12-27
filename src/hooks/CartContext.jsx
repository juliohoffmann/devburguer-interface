import { useEffect, useContext, createContext, useState, useCallback } from "react";


const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState([]);

    // Carrega os produtos do carrinho do localStorage na montagem do componente
    useEffect(() => {
        const storedCart = localStorage.getItem('devburger:cartInfo');
        if (storedCart) {
            try {
                setCartProducts(JSON.parse(storedCart));
            } catch (error) {
                console.error("Erro ao parsear cartInfo do localStorage:", error);
                localStorage.removeItem('devburger:cartInfo'); // Limpa se estiver corrompido
            }
        }
    }, []); // Executa apenas uma vez na montagem

    // Salva os produtos do carrinho no localStorage sempre que 'cartProducts' muda
    useEffect(() => {
        localStorage.setItem('devburger:cartInfo', JSON.stringify(cartProducts));
    }, [cartProducts]); // Executa sempre que cartProducts é atualizado

    const putProductInCart = useCallback((product) => {
        const productIndex = cartProducts.findIndex(p => p.id === product.id);

        let newCartProducts = [];
        if (productIndex >= 0) {
            // Se o produto já existe no carrinho, aumenta a quantidade
            newCartProducts = cartProducts.map(p =>
                p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
            );
        } else {
            // Se o produto não existe, adiciona com quantidade 1
            newCartProducts = [...cartProducts, { ...product, quantity: 1 }];
        }
        setCartProducts(newCartProducts);
    }, [cartProducts]); // Depende de cartProducts para ter o estado mais recente

    const deleteProduct = useCallback((productId) => {
        const newCartProducts = cartProducts.filter(product => product.id !== productId);
        setCartProducts(newCartProducts);
    }, [cartProducts]);

    const increaseProduct = useCallback((productId) => {
        const newCartProducts = cartProducts.map(product =>
            product.id === productId ? { ...product, quantity: product.quantity + 1 } : product
        );
        setCartProducts(newCartProducts);
    }, [cartProducts]);

    const decreaseProduct = useCallback((productId) => {
        const productIndex = cartProducts.findIndex(p => p.id === productId);

        if (productIndex >= 0) {
            if (cartProducts[productIndex].quantity > 1) {
                const newCartProducts = cartProducts.map(product =>
                    product.id === productId ? { ...product, quantity: product.quantity - 1 } : product
                );
                setCartProducts(newCartProducts);
            } else {
                // Se a quantidade for 1, remove o produto do carrinho
                deleteProduct(productId);
            }
        }
    }, [cartProducts, deleteProduct]); // Depende de cartProducts e deleteProduct

    const clearCart = useCallback(() => {
        setCartProducts([]);

    }, []); // Não depende de nada

    return (
        <CartContext.Provider
            value={{
                cartProducts,
                putProductInCart,
                clearCart,
                deleteProduct,
                increaseProduct, // Corrigido o nome para 'increaseProduct'
                decreaseProduct,
            }}
        >
            {children}
        </CartContext.Provider>
    );

};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart deve ser usado dentro de um CartProvider');
    }
    return context;
};

