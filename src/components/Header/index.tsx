import React, { useState } from 'react';

import { FiPower } from 'react-icons/fi';
import { Container, Profile } from './styles';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

import Logo from '../../assets/logo.svg';

interface Userdata {
    id: number;
    name: string;
    email: string;
    cpf: number;
    password: string;
    avatar_url: string;
    endereco: string;
    numero: number;
    rua: string;
    cidade: string;
}

interface IHeaderProps {
    openModal: () => void;
}

const Header: React.FC<IHeaderProps> = ({ openModal }) => {
    const { signOut } = useAuth();
    const [users, setUsers] = useState<Userdata[]>([]);

    return (
        <Container>
            <header>
                <img src={Logo} alt="GoBarber" />
                <nav>
                    <div>
                        <Profile>
                            <img
                                src="https://avatars3.githubusercontent.com/u/11083288?s=460&u=195f820bdb85e57d7e08038a3f8eec821421d83d&v=4"
                                alt="Helena Paixão"
                            />

                            <div>
                                <span>Bem-vindo,</span>
                                <Link to="/profile">
                                    <strong>Helena Paixão</strong>
                                </Link>
                            </div>
                            <button type="button" onClick={signOut}>
                                <FiPower />
                            </button>
                        </Profile>
                    </div>
                </nav>
            </header>
        </Container>
    );
};

export default Header;
