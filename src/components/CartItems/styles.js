import styled from "styled-components";



export const Container = styled.div`
    background-color: #0a0a0a;
    padding: 30px;
    border-radius: 5px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 900px;
    margin: 30px auto;
`;

export const ProductImage = styled.img`
    height: 80px;
    width: 80px;
    border-radius: 16px;
`;

export const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 12px; /* Espaçamento entre os botões e a quantidade */

    button {
        display: flex; /* Corrigido para 'flex' */
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        border-radius: 4px;
        background-color: ${(props) => props.theme.purple};
        transition: all 0.4s;
        color: ${(props) => props.theme.white};
        border: none;

        &:hover { /* Este hover deve estar dentro do seletor do button */
            background-color: #6F357C;
        }
    }

    span {
        font-size: 18px;
        color: #000000;
    }
`;

export const TrashImagem = styled.img`
    height: 20px;
    width: 20px;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
`;

export const ProductTotalPrice = styled.p`
    font-weight: bold;
`;

export const EmptyCart = styled.p`
    text-align: center;
    font-size: 20px;
    color: #0b0a0a;
    padding: 20px;
`;
