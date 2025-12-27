// src/components/CartButton/index.jsx
import Cart from "../../assets/Cart.png";
import { ContainerButton } from "./styles.js";

// 1. O componente CartButton precisa receber as props
export function CartButton ({ onClick, ...props }) { // Desestruture onClick e colete o resto das props
    return (
        // 2. Passe o onClick e as outras props para o ContainerButton
        <ContainerButton onClick={onClick} {...props}>
            <img src={Cart} alt="Carrinho-de-compras" />
        </ContainerButton>
    );
}