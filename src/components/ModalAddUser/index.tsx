import React, { useRef, useCallback } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Modal from '../Modal';
import Input from '../Input';
import Button from '../Button';
import MaskInput from '../MaskInput';

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

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

interface UserCreateData {
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
            try {
                formRef.current?.setErrors({});
                const shema = Yup.object().shape({
                    name: Yup.string().required('Nome obrigatório'),
                    email: Yup.string()
                        .required('Email Obrigatório')
                        .email('Digite um e-mail válid'),
                    password: Yup.string().required('Senha obrigatória'),
                    cpf: Yup.string().required('CPF obrigatório'),
                    cidade: Yup.string().required('Cidade obrigatória'),
                });

                await shema.validate(data, {
                    abortEarly: false,
                });

                await handleAddUser(data);
                setIsOpen();
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                    return;
                }
            }
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
                <Input name="password" type="password" placeholder="Senha" />
                <MaskInput mask="999.999.999-99" name="cpf"  placeholder="CPF" />
                <Input name="cidade" placeholder="Cidade" />

                <Button type="submit" data-testid="add-user-button">
                    <div className="text">Adicionar Novo Usuário</div>
                </Button>
            </Form>
        </Modal>
    );
};

export default ModalAddUser;
