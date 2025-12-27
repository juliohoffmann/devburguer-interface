import styled from "styled-components";



export const Container = styled.div`

display: flex;
flex-direction: column;
align-items: center;
gap: 20px;
padding: 20px;
border-radius: 8px;
background-color: ${(props) => props.theme.white};
cursor: grab;
box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
position: relative;

 div { /* Este div contém o nome, preço e o CartButton */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 80px;
    text-align: center; /* Centraliza o texto */
    /* Adicione align-items: center; para centralizar o botão se ele for um item flex */
    align-items: center;

    p{
        font-size: 18px;
        color: #ff8c05;
        line-height: 20px; 
        font-weight: 700;
        margin-top: 40px; 
    }
    strong{
        font-size: 22px;
        color: #363636;
        line-height: 20px;
        font-weight: 800;
    }
}

`;

export const CardImage = styled.img`
   
    height: 100px;
    position: absolute;
    top: -50px;  
`;