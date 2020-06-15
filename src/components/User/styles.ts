import styled from 'styled-components';

export const Container = styled.div``;



export const Card = styled.div`
    margin-top: 120px;

    >strong {
        color: #999591;
        font-size: 20px;
        font-weight: 400;
    }

    div {
        background: #3e3b47;
        display: flex;
        align-items: center;
        padding: 16px 24px;
        border-radius: 10px;
        margin-top: 24px;
        position:relative;

        &::before {
            position: absolute;
            height: 80%;
            width: 1px;
            left: 0;
            top: 10%;
            content: '';
            background: #ff9000;
        }

        img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
        }

        strong {
            margin-left: 24px;
            color: #FFF;
        }
        span {
            margin-left: auto;
            display: flex;
            size: 8px;
            align-items:center;
            color: #999591;

            svg {
                color: #ff9000;
                margin-right: 8px;
                margin-left:8px;
            }

        }

    }

    button {
        background: #ff9000;
        padding: 10px;
        border-radius: 8px;
        display: flex;
        border: none;
        transition: 0.1s;

        svg {
          color: #3d3d4d;
        }

        & + button {
          margin-left: 6px;
        }
      }
`;
