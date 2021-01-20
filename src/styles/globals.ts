import styled, { createGlobalStyle } from "styled-components"
import { blue, pink } from "./colors";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        color: #000;
        user-select: none;
    }
    
    body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    
    button {
        outline: none;
        border: none;
    }
    p {
        line-height: 160%;
    }
    a {
        text-decoration: none;    
    }
`;

export const GlobalInput = styled.input`
    background: #C4C4C420;
    border-radius: 5px;
    outline: none;
    border: none;
    padding: 10px;
    color: black;
    transition: 0.2s ease-in-out all;
    width: 100%;

    &::placeholder {
        color: gray;
    }
`;

export const GlobalButton = styled.button`
    background: ${blue};
    border-radius: 10px;
    outline: none;
    border: none;
    padding: 10px;
    color: white;
    text-align: center;
    transition: 0.2s ease all;
    width: 100%;
    font-size: 16px;
    font-weight: bold;

    &:active {
        transform: scale(0.98);
    }

    &:hover {
        opacity: 0.85;
    }
`;

export const GlobalHeading = styled.h2`
    color: #000;
    font-size: 38px;
    margin-bottom: 20px;
`;

export const GlobalEmoji = styled.p`
    font-size: 30px;
`

export const GlobalSmallHeading = styled.h4`
    color: #000;
    margin-bottom: 10px;
`;

export const GlobalDivider = styled.div`
    width: 100%;
    height: 30px;
`;