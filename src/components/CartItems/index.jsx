// src/components/CartItems/index.jsx
import { useCart } from "../../hooks/CartContext";
import { formatPrice } from "../../utils/FormatPrice";
import { Table } from "../index.js";
import TrashIcon from "../../assets/trash.svg";
import { Container, ButtonGroup, ProductImage, TrashImagem, EmptyCart, ProductTotalPrice } from "./styles.js";

export const CartItems = () => {
  const { cartProducts, increaseProduct, decreaseProduct, deleteProduct } =
    useCart();
  console.log(cartProducts);
  return (
    <Container>
      <Table.Root>
        <Table.Header>
          <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th>Item</Table.Th>
            <Table.Th>Preço</Table.Th>
            <Table.Th>Quantidade</Table.Th>
            <Table.Th>Total</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Header>
        <Table.Body>
          {cartProducts?.length ? (
            cartProducts.map((product) => (
              <Table.Tr key={product.id}> {/* Sem espaço aqui */}
                <Table.Td>
                  <ProductImage src={product.url} alt={product.name} />
                </Table.Td>
                <Table.Td>{product.name}</Table.Td>
                <Table.Td>{formatPrice(product.price)}</Table.Td>
                <Table.Td>
                  <ButtonGroup>
                    <button onClick={() => decreaseProduct(product.id)}>-</button>
                    <span>{product.quantity}</span>
                    <button onClick={() => increaseProduct(product.id)}>+</button>
                  </ButtonGroup>
                </Table.Td>
                <Table.Td>
                  <ProductTotalPrice>
                    {formatPrice(product.price * product.quantity)}
                  </ProductTotalPrice>
                </Table.Td>
                <Table.Td>
                  <TrashImagem src={TrashIcon} alt="Remover produto" onClick={() => deleteProduct(product.id)} />
                </Table.Td>
              </Table.Tr>
            ))
          ) : (
            <Table.Tr>
              <Table.Td colSpan="6">
                <EmptyCart>Seu carrinho está vazio</EmptyCart>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Body>
      </Table.Root>
    </Container>
  );
};
