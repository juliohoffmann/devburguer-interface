import styled from "styled-components";
import BannerHamburguer from "../../assets/Banner-hamburguer.png";
import background from "../../assets/background.png";
import { Link } from "react-router-dom";
export const Container = styled.div`
   width: 100%;
   min-height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5), /* Opacidade media (50%) para a estampa sutil */
      rgba(255, 255, 255, 0.5)
    ),
      url(${background});
`;
export const Banner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
   height: 480px;
   width: 100%;
   position: relative;
   background-image: url(${BannerHamburguer});
   border-color: ${(props) => props.theme.mainBlack};
   background-position: center;
   background-size: cover;
   h1 {
       font-family: 'Road Rage', sans-serif;
       font-size: 80px;
       line-height:65px;
      position: absolute;
      color: #fff;
      right: 20%;
      top: 30%;
      span {
          display: block;
          color: #fff;
          font-size: 20px;
      }
   }
`;
export const BackButton = styled.button`
   background-color: ${(props) => props.theme.secondWhite};
  color: ${(props) => props.theme.black};
  padding: 10px 20px;
 border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px; /* Espaçamento */
  &:hover {
    background-color: ${(props) => props.theme.secondWhite};
   }
 `;
export const CategoryMenu = styled.div`
display: flex;
justify-content: center;
align-items: center;
gap: 50px;
margin: 20px 0px;
`;
export const CategoryButton = styled(Link).withConfig({
 shouldForwardProp: (prop) => !['isActive'].includes(prop),
    })`
text-decoration: none;
cursor: pointer;
background : none;
color: ${(props) => (props.isActive ? (props) => props.theme.purple : '${(props) => props.theme.darkGray}')}; 
font-size: 20px;
font-weight: 500;
padding-bottom: 5px;
line-height: 24px;
border: none;
border-bottom: ${props => props.isActive && `3px solid ${(props) => props.theme.purple}`}; /* Adiciona uma borda azul quando o botão estiver ativo */3px solid ${(props) => props.theme.purple};
`;

export const ProductsContainer = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
padding: 40px;;
gap: 60px;
justify-content: center;
max-width: 1200px;
margin: 50px auto;
`;