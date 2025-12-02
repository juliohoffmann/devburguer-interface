// src/components/Button/index.jsx (após renomear)
import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #9758A6; /* Exemplo de cor */
  color: #ffffff;
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  width: 100%; /* Para ocupar a largura total do formulário */

  &:hover {
    opacity: 0.9;
  }
`;

export function Button({ children, ...props }) {
  return <StyledButton {...props}>{children}</StyledButton>;
}




