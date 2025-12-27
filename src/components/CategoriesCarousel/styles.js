import { Link } from "react-router-dom";
import styled from "styled-components";



export const Container = styled.div`
   carousel-item{
    padding-right: 40px;
   }
   padding-left: 40px;
`;

export const Title = styled.h2`
    font-size: 32px;
    font-weight: 800;
    color: #9258a6;
    padding-bottom : 12px;
    position: relative;
    text-align: center;
    margin-bottom: 24px;
    margin-top: 24px;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: calc(50% - 28px); ;
      width: 56px;
      height: 4px;
      background-color: #9258a6;
    }
   
`;

export const ContainerItems = styled.div`
          /* Seus estilos para cada item do carrossel */
      background: url('${props => props.$imageUrl}');
      background-position: center;
      background-size: cover;
      border-radius: 20px;
      display: flex;
      align-items: center;
      padding: 20px 10px;
      width: 100%;
      height: 250px;

      
 `;
 export const CategoryButton = styled(Link).withConfig({
      shouldForwardProp: (prop) => !['isActive'].includes(prop),
    })`
   color: #fff;
   background-color: rgba(0, 0, 0, 0.5);
   padding: 10px 30px;
   border-radius: 30px;
   font-size: 22.5px;
   text-decoration: none;
   margin-top: 50px;
   font-weight: 500;

   &:hover {
     
      background-color: #9258a6;
   }
  
 `;