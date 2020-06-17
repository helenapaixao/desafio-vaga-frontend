import React, { useState, useEffect } from 'react';
import { Container, Content, Shedule, UsersContainer } from './styles';

import User from '../../components/User';
import api from '../../services/api';
import ModalEditUser from '../../components/ModalEditUser';
import ModalAddUser from '../../components/ModalAddUser';
import Header from '../../components/Header';
import { FiSearch } from 'react-icons/fi';
import SearchInput from '../../components/SearchInput';


interface Userdata {
    id: number;
    name: string;
    email: string;
    password: string;
    cpf: number;
    avatar_url: string;
    endereco: string;
    numero: number;
    rua: string;
    cidade: string;
}

const Dashboard: React.FC = () => {
    const [users, setUsers] = useState<Userdata[]>([]);
    const [editingUser, setEditingUser] = useState<Userdata>({} as Userdata);
    const [modalOpen, setModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        api.get('/users').then(resp => {
            setUsers(resp.data);
        });
    }, []);

    useEffect(() => {
        async function loadUsers(): Promise<void> {
            api.get(`/users?name_like=${searchValue.replace(' ', '+')}`).then(
                ({ data: usersContainer }) => {
                    setUsers(usersContainer);
                },
            );
        }

        loadUsers();
    }, [searchValue]);

    async function handleAddUser(user: Omit<Userdata, 'id'>): Promise<void> {
        try {
            const responseAdd = await api.post<Userdata>('/users', {
                ...user,
            });
            setUsers([...users, responseAdd.data]);
        } catch (err) {
            console.log(err);
        }
    }

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

    async function handleDeleteUser(id: number): Promise<void> {
        await api.delete(`/users/${id}`);
        const newUsers = [...users];
        const indexDeleted = newUsers.findIndex(w => w.id === id);
        newUsers.splice(indexDeleted, 1);
        setUsers([...newUsers]);
    }

    function toggleModal(): void {
        setModalOpen(!modalOpen);
    }

    function toggleEditModal(): void {
        setEditModalOpen(!editModalOpen);
    }

    function handleEditUser(user: Userdata): void {
        setEditingUser(user);
        toggleEditModal();
    }

    return (
        <Container>
            <Header openModal={toggleModal}></Header>
            <ModalAddUser
                isOpen={modalOpen}
                setIsOpen={toggleModal}
                handleAddUser={handleAddUser}
            />

            <ModalEditUser
                isOpen={editModalOpen}
                setIsOpen={toggleEditModal}
                editingUser={editingUser}
                handleUpdateUser={handleUpdateUser}
            />
            <Content>
                <Shedule>
                    <SearchInput
                        name="search"
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                        icon={FiSearch}
                        placeholder="Buscar Usuário"
                    />
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
