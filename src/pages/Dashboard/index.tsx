import React from 'react';
import { Container, Header, HeaderContent, Profile } from './styles';
import { FiPower } from 'react-icons/fi';

const Dashboard: React.FC = () => (
    <Container>
        <Header>
            <HeaderContent>
                <Profile>
                    <img
                        src="https://avatars3.githubusercontent.com/u/11083288?s=460&u=195f820bdb85e57d7e08038a3f8eec821421d83d&v=4"
                        alt="Helena Paixão"
                    />

                    <div>
                        <span>Bem-vindo,</span>
                        <strong>Helena Paixão</strong>
                    </div>
                </Profile>
                <button type="button">
                    <FiPower />
                </button>
            </HeaderContent>
        </Header>
    </Container>
);

export default Dashboard;
