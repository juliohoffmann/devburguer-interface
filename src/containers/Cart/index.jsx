import { Container, Banner, Title, Content } from "./styles";
import logo from "../../assets/logo.png"; // Correto
import { CartItems, CartResume } from "../../components";



export function Cart() {
    return (
        <Container>
            <Banner>
                <img src={logo} alt="logo DevBurguer"/>
            </Banner>
            <Title>Checkout - Pedido</Title>
            <Content> 
               <CartItems/> 
               <CartResume/>
            </Content>
        </Container>
    );
}