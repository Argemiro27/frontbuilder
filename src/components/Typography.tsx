import styled from "styled-components";

interface TypographyProps {
    variant?: 'h1' | 'h2' | 'h3' | 'default';
    color?: string;
}

const getFontSize = (variant: string) => {
    switch (variant) {
        case 'h1':
            return '2.5em';
        case 'h2':
            return '2em';
        case 'h3':
            return '1.5em';
        default:
            return '1em';
    }
};

const getFontWeight = (variant: string) => {
    return variant.startsWith('h') ? 'bold' : 'normal';
};

const Typography = styled.p<TypographyProps>`

    font-size: ${(props) => getFontSize(props.variant || 'default')};
    font-weight: ${(props) => getFontWeight(props.variant || 'default')};
    color: ${(props) => (props.color ? props.color : 'black')};
  `;

export default Typography;