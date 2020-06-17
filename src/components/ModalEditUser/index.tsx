import React, { useCallback, useRef } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Modal from '../Modal';
import Input from '../Input';
import Button from '../Button';
import MaskInput from '../MaskInput';
import './styles';

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

interface IModalProps {
    isOpen: boolean;
    setIsOpen: () => void;
    handleUpdateUser: (user: Omit<Userdata, 'id'>) => void;
    editingUser: Userdata;
}

interface IEditUserData {
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

const ModalEditUser: React.FC<IModalProps> = ({
    isOpen,
    setIsOpen,
    editingUser,
    handleUpdateUser,
}) => {
    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback(
        async (data: IEditUserData) => {
            handleUpdateUser(data);
            setIsOpen();
        },
        [handleUpdateUser, setIsOpen],
    );

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <Form
                ref={formRef}
                onSubmit={handleSubmit}
                initialData={editingUser}
            >
                <h1>Editar Usuario Cadastrado</h1>

                <Input
                    name="avatar_url"
                    placeholder="Cole o link aqui da imagem"
                />

                <Input name="name" placeholder="Nome" />
                <Input name="email" placeholder="E-mail" />
                <Input name="cidade" placeholder="Cidade" />
                <MaskInput mask="999.999.999-99" name="cpf" placeholder="CPF" />

                <Button type="submit" data-testid="edit-user-button">
                    <div className="text">Editar Usuário</div>
                    <div className="icon"></div>
                </Button>
            </Form>
        </Modal>
    );
};

export default ModalEditUser;
