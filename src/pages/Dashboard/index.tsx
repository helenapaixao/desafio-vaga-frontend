import React, { useState, useEffect } from 'react';
import {
    Container,
    Header,
    HeaderContent,
    Profile,
    Content,
    Shedule,
    UsersContainer,
} from './styles';
import { Link } from 'react-router-dom';
import { FiPower, FiUser, FiCreditCard, FiAnchor } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
import User from '../../components/User';
import api from '../../services/api';

interface Userdata {
    id: number;
    name: string;
    email: string;
    password: string;
    cpf:number;
    avatar_url: string;
    endereco: string;
    numero: number;
    rua: string;
    cidade: string;
}

const Dashboard: React.FC = () => {
    const [users, setUsers] = useState<Userdata[]>([]);
    const [editingUser, setEditingUser] = useState<Userdata>({} as Userdata);
    const { signOut } = useAuth();

    useEffect(() => {
        api.get('/users').then(resp => {
            setUsers(resp.data);
        });
    }, []);

    async function handleUpdateUser(user: Omit<Userdata, 'id'>): Promise<void> {
        const { id } = editingUser;
        const responseEdit = await api.put<Userdata>(`/users/${id}`, {
            ...user,
            id,
        });
        const newUsers = [...users];
        const indexUser = newUsers.findIndex(w => w.id === id);
        newUsers[indexUser] = responseEdit.data;
        setUsers([...newUsers]);
    }

    async function handleDeleteUser(id: number): Promise<void> {}

    function handleEditUser(user: Userdata): void {
        setEditingUser(user);
    }

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
                                <strong>Helena Paixão</strong>
                            </Link>
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

                    <UsersContainer>
                        {users &&
                            users.map(user => (
                                <User
                                    key={user.id}
                                    user={user}
                                    handleDelete={handleDeleteUser}
                                    handleEditUser={handleEditUser}
                                />
                            ))}
                    </UsersContainer>
                </Shedule>
            </Content>
        </Container>
    );
};
export default Dashboard;
