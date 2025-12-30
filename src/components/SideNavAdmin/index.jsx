
import { navLinks } from "./navLinks.jsx";

import Logo from "../../assets/Logo.png";
import { SignOut } from "@phosphor-icons/react";
import { Container, NavLinksContainer, NavLink, Footer } from "./styles";
import { useUser } from "../../hooks/UserContext";
import { useResolvedPath } from "react-router-dom";




export function SideNavAdmin() {
    const {logout} = useUser();
    const { pathname } = useResolvedPath();
    return (
        <Container>
            <img src={Logo} alt="Logo DevBurguer" />
            <NavLinksContainer>
                {navLinks.map((link) => (
                    <NavLink
                     key={link.id}
                      to={link.path}
                      $isActive={pathname === link.path}>
                        {link.icon}
                        <span>
                        {link.label}
                        </span>
                        
                    </NavLink>
                ))}
            </NavLinksContainer>
            <Footer>
                <NavLink to= "/Login" onClick={logout}> <SignOut/> 
                <p><span> Sair </span></p>
                </NavLink>
            </Footer>
        </Container>
    );
}