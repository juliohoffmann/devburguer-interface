import { Container, Banner, Title, Content } from "./styles";
import Logo from "../../assets/Logo.png";

import { CartItems, CartResume } from "../../components";



export function Cart() {
    return (
        <Container>
            <Banner>
                <img src={Logo} alt="Logo DevBurguer"/>
            </Banner>
            <Title>Checkout - Pedido</Title>
            <Content> 
               <CartItems/> 
               <CartResume/>
            </Content>
        </Container>
    );
}