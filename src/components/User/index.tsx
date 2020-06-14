import React from 'react';

import {
    FiEdit3,
    FiTrash,
    FiUser,
    FiCreditCard,
    FiAnchor,
} from 'react-icons/fi';

import { Container, Card } from './styles';
import { Link } from 'react-router-dom';

interface Userdata {
    id: number;
    name: string;
    email: string;
    cpf:number;
    password: string;
    avatar_url: string;
    endereco: string;
    numero: number;
    rua: string;
    cidade: string;
}

interface UserProps {
    user: Userdata;
    handleDelete: (id: number) => {};
    handleEditUser: (user: Userdata) => void;
}

const User: React.FC<UserProps> = ({
    user,
    handleDelete,
    handleEditUser,
}: UserProps) => {
    function setEditingUser(): void {
        handleEditUser(user);
    }

    return (
        <Container>
            <Card>
                <div>
                    <img
                        src="https://avatars3.githubusercontent.com/u/11083288?s=460&u=195f820bdb85e57d7e08038a3f8eec821421d83d&v=4"
                        alt="Helena Paixão"
                    />
                    <strong> {user.name}</strong>
                    <span>
                        <FiUser />
                       
                        <FiCreditCard />
                        {user.cpf}
                        <FiAnchor />
                        Cidade
                    </span>
                </div>
            </Card>
        </Container>
    );
};

export default User;
