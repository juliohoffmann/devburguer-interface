// src/components/CartButton/index.jsx
import React from "react";
import Cart from "../../assets/Cart.png";
import { ContainerButton } from "./styles.js";
import { toast } from 'react-toastify'; // Importe o toast

export function CartButton({ onClick, ...props }) {
    const handleClick = () => {
        // 1. Chama a função onClick original (que adiciona o produto ao carrinho)
        if (onClick) {
            onClick();
        }
        // 2. Exibe a mensagem de confirmação usando react-toastify
        toast.success("Produto adicionado ao carrinho!");
    };

    return (
        <ContainerButton onClick={handleClick} {...props}>
            <img src={Cart} alt="Carrinho-de-compras" />
        </ContainerButton>
    );
}
