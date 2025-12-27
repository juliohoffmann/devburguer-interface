import styled from "styled-components";

import backgroundLight from "../../assets/background 1.png";
import backgroundDark from "../../assets/background 2.png";


export const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  
`;

export const LeftContainer = styled.div`
  background-image: url(${backgroundDark});
  background-size: cover;
  background-position: center;
  
  height: 100%;
  width: 100%;
  max-width: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
 
  img {
    width: 80%;
    max-width: 600px;
  }
`;

export const RightContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
   background-size: cover;
   background-position: center;
   padding: 20px;

  height: 100vh;
  width: 100vw;
  
  background-image: url(${backgroundLight});
  

  p {
    color: ${(props) => props.theme.white};
    font-size: 18px;
    font-weight: 800;
    margin-top: 25px;

    
  }
`;

export const Title = styled.h2`
  font-family: "Road Rage", sans-serif;
  font-size: 40px;
  color: #9758A6;
  text-align: center;
  margin-bottom: 20px;
 
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 3px;
  width: 80%;
  max-width: 400px;
  
`;
export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  
  

  input {
   width: 100%;
   border : none;
   height: 52px;
   border-radius: 6px;
   padding: 0 15px;
   color: #333;
    font-size: 16px;

  };

  label {
    font-size: 16px;
    font-weight: 600;
    color: ${(props) => props.theme.white};
  };
  p {
    color: ${(props) => props.theme.darkRed};
    font-size: 14px;
    line-height: 80%;
    font-weight: 600;
    height: 10px;
  }
`;
export const Link = styled.a`
  color: ${(props) => props.theme.white};
  font-size: 16px;
  font-weight: 900;
  cursor: pointer;
  
  text-decoration: none;

  &:hover {
    color: #9758A6;
  }


`;