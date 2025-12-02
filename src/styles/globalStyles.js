import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
  }

  body {
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background-color: #f5f5f5;
    color: #333;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
  }

  button {
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
  }

  input, textarea, select {
    font-family: 'Poppins', sans-serif;
  }
`;
