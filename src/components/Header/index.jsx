import { UserCircleIcon, ShoppingCartIcon } from "@phosphor-icons/react";
import { useNavigate, useResolvedPath } from "react-router-dom";
import { useUser } from "../../hooks/UserContext";
import {
    Container,
    Navigation,
    HeaderLink,
    Options,
    Profile,
    LogoutLeave,
    Content,
    LinkContainer
} from "./styles.js";

export function Header() {
    const navigate = useNavigate();
    const { logout, userInfo } = useUser();
    const { pathname } = useResolvedPath(); // Desestruturar pathname diretamente

    function logoutUser() {
        logout();
        navigate("/Login"); // Note: "Login" com L maiúsculo, verifique se é o caminho correto
        console.log(userInfo); // userInfo aqui ainda terá o valor ANTES do logout
    }

   return (
        <Container>
            <Content>
                <Navigation>
                    <div>
                        <HeaderLink to="/" $isActive={pathname === "/"}>Home</HeaderLink>
                        <hr></hr>
                        <HeaderLink to="/cardapio" $isActive={pathname === "/cardapio"}>Cardápio</HeaderLink>
                    </div>
                </Navigation>
                <Options>
                    <Profile>
                        <UserCircleIcon color="#fff" size={24} />
                        <div>
                            {/* CORREÇÃO AQUI: Verificação condicional para userInfo.name */}
                            <p> Olá, <span>{userInfo?.name || 'Visitante'} </span></p>
                            <LogoutLeave onClick={logoutUser}> Sair </LogoutLeave>
                        </div>
                    </Profile>
                    <LinkContainer>
                        <ShoppingCartIcon color="#fff" size={24} />
                        <HeaderLink to="/carrinho"> Carrinho </HeaderLink>
                    </LinkContainer>
                </Options>
            </Content>
        </Container>
    )
}