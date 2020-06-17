import styled from 'styled-components';

export const Container = styled.div`
    padding: 32px 0px;
    background: #28262e;

    header {
        max-width: 1120px;
        margin: 64px auto;
        display: flex;
        align-items: center;
    }
    

    nav {
        div {
            
            button {
                color: #999591;
                margin-left: 180px;
                background: transparent;
                border: 0;
                height: 20px;
                align-items:center;
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
        display: flex;
      align-items: center;
      text-transform: capitalize;
        color: #f4ede8;
    }

    a {
        text-decoration: none;
        color: #ff9000;

        &::hover {
            opacity: 0.8;
        }
    }

    svg {
        margin-left: 300px;
        display:flex;
    }
`;
