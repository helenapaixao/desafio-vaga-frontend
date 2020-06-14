import React from 'react';
import {
    Container,
    Header,
    HeaderContent,
    Profile,
    Content,
    Shedule,
    Card,
} from './styles';
import { FiPower, FiUser, FiCreditCard, FiAnchor } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const { signOut } = useAuth();
    return (
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
                           <Link to="/profile">
                           <strong>Helena Paixão</strong></Link> 
                        </div>
                    </Profile>
                    <button type="button" onClick={signOut}>
                        <FiPower />
                    </button>
                </HeaderContent>
            </Header>
            <Content>
                <Shedule>
                    <h1>Listagem de Usuários</h1>
                    <p>
                        <span>Cadastrados</span>
                    </p>
                    <Card>
                        <div>
                            <img
                                src="https://avatars3.githubusercontent.com/u/11083288?s=460&u=195f820bdb85e57d7e08038a3f8eec821421d83d&v=4"
                                alt="Helena Paixão"
                            />
                            <strong>Helena Paixão</strong>
                            <span>
                                <FiUser />
                                Nome
                                <FiCreditCard />
                                CPF
                                <FiAnchor />
                                Cidade
                            </span>
                        </div>
                    </Card>
                </Shedule>
            </Content>
        </Container>
    );
};
export default Dashboard;
