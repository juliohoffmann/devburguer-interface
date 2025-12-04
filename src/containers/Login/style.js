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
    color: #ffffff;
    font-size: 18px;
    font-weight: 800;
    margin-top: 25px;

    a {
      text-decoration: underline;
      font-weight: inherit;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
        opacity: 0.9;
      }
    }
  }
`;

export const Title = styled.h2`
  font-family: "Road Rage", sans-serif;
  font-size: 40px;
  color: #ffffff;
  text-align: center;
  margin-bottom: 40px;
 

  span {
    color: #9758A6;
    
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
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
    color: #ffffff;
  };
  p {
    color: #cf3057;
    font-size: 14px;
    line-height: 80%;
    font-weight: 600;
    height: 10px;
  }
`;

export const Link = styled.a`
  
  text-decoration: none;
  font-size: 13px;
  font-weight: 700;
  color: #ffffff;
  align-self: flex-end;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    opacity: 0.9;

  }
`;
