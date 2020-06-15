import styled from 'styled-components';

export const Container = styled.div``;




export const Content = styled.main`
    max-width: 1120px;
    margin: 64px auto;
    display: flex;
`;
export const Shedule = styled.div`
    flex: 1;
    margin-right: 120px;

    h1 {
        font-size: 36px;
    }

    p {
        margin-top: 8px;
        color: #ff9000;
        display: flex;
        align-items: center;

        span {
            display: flex;
            align-items: center;
        }

        span + span ::before {
            content: '';
            width: 1px;
            height: 12px;
            background: #ff9000;
            margin-left: 8px;
            margin: 8px;
        }
    }
`;

export const UsersContainer = styled.div`
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 40px 0;
    margin-top: -100px;

    display: list-item;

    grid-template-columns: repeat(3, 1fr);
    grid-gap: 32px;
`;
