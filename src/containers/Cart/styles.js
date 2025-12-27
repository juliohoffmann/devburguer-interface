import styled from "styled-components";
import texture from "../../assets/background 2.png";
import background from "../../assets/background 1.png";


export const Container = styled.div`
width: 100%;
min-height: 100%;
background-color: #f0f0f0;

background: linear-gradient(
      rgba(255, 255, 255, 0.6), /* Opacidade  media (60%) para a estampa sutil */
      rgba(255, 255, 255, 0.6)
    ),
    url(${background}); /* Sua imagem de estampa clara */
    min-height: 100vh;

`;
export const Banner = styled.div`
background-size: cover;
background-position: center;
background-color: #1f1f1f;
background-image: url(${texture});
display: flex;
align-items: center;
justify-content: center;
position: relative;
height: 180px;

img {
    height : 140px;
    max-width: 600px;
}

`;
export const Title = styled.h1`
font-size: 40px;
font-weight: 800;
color: ${(props) => props.theme.gren};
padding-bottom : 12px;
position: relative;
text-align: center;

&::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: calc(50% - 28px); 
  width: 56px;
  height: 4px;
  background-color: ${(props) => props.theme.gren};
}
`;
export const Content = styled.div`
        display: grid;
        grid-template-columns:  2fr 1fr;
        gap: 40px;
        width: 100%;
        max-width: 1200px;
        padding: 40px;
        margin: 0 auto;
 @media (max-width: 990px) { /* Ou um breakpoint que faça sentido para você */
            grid-template-columns: 1fr; /* Em telas menores, empilhe os itens em uma única coluna */
            flex-direction: column; /* Garante que se comporte como coluna se for flex */
            align-items: center; /* Centraliza os itens */
            padding: 20px; /* Ajuste o padding para telas menores */
        }
    `;