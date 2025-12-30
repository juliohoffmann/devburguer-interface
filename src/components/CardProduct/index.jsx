/** biome-ignore-all assist/source/organizeImports: <explanation> */
import PropTypes from "prop-types";

import { CardImage, Container } from "./styles.js";
import { CartButton } from "../CartButton/index.jsx";
import { useCart } from "../../hooks/CartContext.jsx";



export default function cardProduct({ product }) {
    const { putProductInCart } = useCart();

    return (
    <Container>
    <CardImage src={product.url} alt={product.name} />
    <div>
   <p>{product.name}</p>
    <strong>{product.formatedPrice}</strong>
    </div>
    <CartButton  onClick={() =>putProductInCart(product)}></CartButton>
    </Container>
);
}
cardProduct.propTypes = {
   product: PropTypes.object.isRequired,
};