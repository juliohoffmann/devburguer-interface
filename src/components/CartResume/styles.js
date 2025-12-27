import styled from "styled-components";

export const ContainerPrime = styled.div`
    background-color: #0a0a0a;
    padding: 30px;
    border-radius: 5px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 900px;
    margin: 30px auto;
`;
export const Content = styled.div`
    background-color: ${(props) => props.theme.white};
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 20px;

    *{
        color: ${(props) => props.theme.secondBlack};
        font-weight: 500;
    }
.container-top{
    display: grid;
    grid-gap: 10px 20%;
    grid-template-areas:
    'title title'
    'items items-price'
    'delivery delivery-price';

    .title{
        grid-area: title;
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 20px;
        background-color: ${(props) => props.theme.secondBlack};
        color: ${(props) => props.theme.white};
        padding: 12px;
        text-align: center;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;


    }
    .items{
        grid-area: items;
        padding-left: 20px;
    }
    .items-price{
        grid-area: items-price;
        padding-right: 20px;
    }
    .delyvery-tax{
        grid-area: delivery;
        padding-left: 20px;
    }
    .delivery-tax-price{
        grid-area: delivery-price;
    }
}  
 .container-bottom{
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    font-weight: 700;
    margin-top: 24px;
    padding: 20px;
   *{
    font-weight: 700;
   }
 }
`;