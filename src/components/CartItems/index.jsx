/** biome-ignore-all assist/source/organizeImports: <explanation> */
import { useCart } from "../../hooks/cartContext";
import { formatPrice } from "../../utils/FormatPrice"; // Assumindo que você tem essa função
import { Table } from "../index.js"; // Seus componentes de tabela
import TrashIcon from "../../assets/trash.svg"; // <-- VERIFIQUE ESTE CAMINHO!

import { Container, ButtonGroup, ProductImage, TrashImagem, EmptyCart, ProductTotalPrice } from "./styles.js"; // Importe os Styled Components

export function CartItems() {
    const {
        cartProducts,
        increaseProduct,
        decreaseProduct,
        deleteProduct } = useCart();

    return (
        <Container> {/* Use o Container aqui se ele for o wrapper principal */}
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
                            <Table.Tr key={product.id}>
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
                                    <TrashImagem
                                        src={TrashIcon}
                                        alt="Remover produto"
                                        onClick={() => deleteProduct(product.id)}
                                    />
                                </Table.Td>
                            </Table.Tr>
                        ))
                    ) : (
                        <Table.Tr> {/* A mensagem de carrinho vazio deve estar dentro de um <tr> */}
                            <Table.Td colSpan="6"> {/* colSpan para ocupar todas as colunas */}
                                <EmptyCart>Seu carrinho está vazio</EmptyCart>
                            </Table.Td>
                        </Table.Tr>
                    )}
                </Table.Body>
            </Table.Root>
        </Container>
    );
}
