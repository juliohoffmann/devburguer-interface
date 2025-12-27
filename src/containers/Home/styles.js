import styled from "styled-components";

import BannerHome from "../../assets/banner-home.png";
import backgroundLight  from "../../assets/background 1.png";

export const Banner = styled.div`
  background: linear-gradient(
      rgba(0, 0, 0, 0.3), /* Overlay escuro (30% de opacidade) */
      rgba(0, 0, 0, 0.3)
    ),
    url(${BannerHome}); /* Imagem do banner */

  background-size: cover;
  background-position: center;
  height: 485px; /* Altura do seu banner */
  display: flex;
  align-items: center; /* Centraliza verticalmente o h1 */
  justify-content: center; /* Centraliza horizontalmente o h1 */
  position: relative; /* Para posicionamento de outros elementos se necessário */


h1 {
    font-family: 'Road Rage', sans-serif;
    font-size: 50px;
    color: ${(props) => props.theme.darkWhite}; /* Cor do texto "Bem-vindo(a)!" */
    text-align: center;
    z-index: 1;
    
  }
`;
export const Container = styled.section`
background: linear-gradient(
      rgba(255, 255, 255, 0.5), /* Opacidade  media (50%) para a estampa sutil */
      rgba(255, 255, 255, 0.5)
    ),
    url(${backgroundLight}); /* Sua imagem de estampa clara */
`;



