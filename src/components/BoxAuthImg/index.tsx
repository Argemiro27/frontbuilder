import { Box } from "@mui/material";
import imgLogin from '../../assets/bgLogin2.gif';
import { styled } from "styled-components";

const BoxAuthImg = styled(Box)`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${imgLogin});
    background-repeat: no-repeat;
    background-size: cover; 
    background-position: center;
    background-color: #a77bff;
`;

export default BoxAuthImg;
