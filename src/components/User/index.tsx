import React from 'react';

import {
    FiEdit3,
    FiTrash,
    FiCreditCard,
    FiAnchor,
} from 'react-icons/fi';

import { Container, Card } from './styles';
import Skeleton from 'react-loading-skeleton';


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
                    <img src={user.avatar_url} alt={user.name} />
                    <strong> {user.name}</strong>
                    <span>
                        <FiCreditCard />
                        {user.cpf}
                        <FiAnchor />
                       {user.cidade}
                    </span>
                    <section>
                        <div>
                            <button
                                type="button"
                                className="icon"
                                onClick={() => setEditingUser()}
                                data-testid={`edit-user-${user.id}`}
                            >
                                <FiEdit3 size={20} />
                            </button>
                            <button
                                type="button"
                                className="icon"
                                onClick={() => handleDelete(user.id)}
                                data-testid={`remove-user-${user.id}`}
                            >
                                <FiTrash size={20} />
                            </button>
                        </div>
                    </section>
                </div>
            </Card>
        </Container>
    );
};

export default User;
