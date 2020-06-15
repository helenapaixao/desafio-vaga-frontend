import styled from 'styled-components';

export const Container = styled.div`
    padding: 32px 0px;
    background: #28262e;

    header {
        max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
    }

    nav {
        div {
            button {
                color: #999591;
                margin-left: 280px;
                background: transparent;
                border: 0;
                height: 20px;
            }
        }

        > img {
            height: 80px;
        }
    }
`;


export const Profile = styled.div`
    display: flex;
    align-items: center;
    margin-left: 50px;

    img {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        margin-left: 30px;
    }
    div {
        display: flex;
        flex-direction: column;
        margin-left: 16px;
        line-height: 24px;
    }

    span {
        color: #f4ede8;
    }

    a {
        text-decoration: none;
        color: #ff9000;

        &::hover {
            opacity: 0.8;
        }
    }
`;

