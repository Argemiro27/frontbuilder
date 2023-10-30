import { Button } from '@mui/material';

import { styled } from "styled-components";
import colors from '../theme/colors';

export const Btn = styled(Button)`
    background-color: ${colors.secondary} !important;
    color: ${colors.textBtn} !important;
    font-weight: bold !important;
`
