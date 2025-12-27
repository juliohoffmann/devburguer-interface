import styled from "styled-components";

export const Container = styled.footer`
    background-color: ${(props) => props.theme.darkPurple};
    width: 100vw;
    height: 52px;
    padding: 0 56px;
    display: flex;
    justify-content: center;
    align-items: center;

p {
    color: ${(props) => props.theme.white};
    font-size: 14px;
    font-weight: lighter;
    
}

`;