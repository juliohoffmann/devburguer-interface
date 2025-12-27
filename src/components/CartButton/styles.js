// src/components/CartButton/styles.js
import styled from "styled-components";

export const ContainerButton = styled.button`
    background-color: #9758A6;
    width: 100%; /* Ocupa toda a largura disponível dentro do CardProduct */
    height: 52px;
    border: none; /* Use 'none' em vez de '0' para border */
    border-radius: 5px;
    font-size: 30px; /* Isso afeta o texto, se houver. Para a imagem, não é relevante. */
    color: ${(props) => props.theme.white};
    cursor: pointer; /* Indica que é clicável */
    transition: background-color 0.3s ease; /* Transição suave para o hover */

    /* Adicione display flex para centralizar o conteúdo (a imagem) */
    display: flex;
    justify-content: center; /* Centraliza horizontalmente */
    align-items: center; /* Centraliza verticalmente */

    img { /* Estilos para a imagem dentro do botão */
        width: 40px;/* Tamanho da imagem do carrinho */
        height: 40px; /* Tamanho da imagem do carrinho */
        object-fit: contain; /* Garante que a imagem se ajuste sem cortar */
        /* filter: invert(100%); /* Descomente se o ícone for preto e o fundo do botão for escuro */
    }

    &:hover {
        background-color: #6F357C;
    }
`;
