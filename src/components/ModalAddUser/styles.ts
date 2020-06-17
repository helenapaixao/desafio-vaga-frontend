import styled from 'styled-components';
import { Form as Unform } from '@unform/web';
import { shade } from 'polished';

export const Form = styled(Unform)`
    padding: 48px 40px;
    display: flex;
    flex-direction: column;

    h1 {
        font-weight: 600;
        font-size: 36px;
        line-height: 36px;
        margin-bottom: 50px;
        align-items: center;
   
    }

    button {
        background: #ff9000;
        border-radius: 10px;
        border: 0;
        padding: 16px;
        color: #312e38;
        width: 100%;
        font-weight: 500;
        margin-top: 16px;
        transition: background-color 0.2s;
        &:hover {
            background: ${shade(0.2, '#ff9000')};
        }
    }
`;
