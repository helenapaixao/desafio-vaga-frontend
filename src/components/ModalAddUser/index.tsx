import React, { useRef, useCallback } from 'react';


import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Modal from '../Modal';
import Input from '../Input';
import Button from '../Button';
import MaskInput from '../MaskInput'

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

interface UserCreateData {
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

interface ModalProps {
    isOpen: boolean;
    setIsOpen: () => void;
    handleAddUser: (user: Omit<Userdata, 'id'>) => void;
}

const ModalAddUser: React.FC<ModalProps> = ({
    isOpen,
    setIsOpen,
    handleAddUser,
}) => {
    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback(
        async (data: UserCreateData) => {
            handleAddUser(data);
            setIsOpen();
        },
        [handleAddUser, setIsOpen],
    );

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Novo Usuario</h1>
                <Input
                    name="avatar_url"
                    placeholder="Cole o link aqui da imagem"
                />
                <Input name="name" placeholder="Nome" />
                <Input name="email" placeholder="E-mail" />
                <Input name="password" placeholder="Senha" />
                <MaskInput
                            name="cpf"      
                            placeholder="CPF"
                            mask="999.999.999-99"
                        />
                <Input name="cidade" placeholder="Cidade" />

                <Button type="submit" data-testid="add-user-button">
                    <div className="text">Adicionar Novo  Usuário</div>
                
                </Button>
            </Form>
        </Modal>
    );
};

export default ModalAddUser;
