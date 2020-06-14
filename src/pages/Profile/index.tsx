import React, { useCallback, useRef } from 'react';
import { Container, Content, AvatarInput } from './styles';
import {
    FiUser,
    FiMail,
    FiLock,
    FiCreditCard,
    FiSend,
    FiCamera,
    FiArrowLeft,
} from 'react-icons/fi';

import { useHistory, Link } from 'react-router-dom';
import { useToast } from '../../hooks/toast';

// import axios from 'axios';
import api from '../../services/api';

import * as Yup from 'yup';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';

interface ProfileFormData {
    name: string;
    email: string;
    password: string;
    cpf: string;
    cep: string;
    bairro: string;
    city: string;
}

const Profile: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();
    // const [ceps, setCeps] = useState<string[]>([]);
    // const [selectedCEP, setSelectedCEP] = useState<string[]>([]);

    const {name} = useAuth();

    const handleSubmit = useCallback(
        async (data: ProfileFormData) => {
            try {
                formRef.current?.setErrors([]);
                const shema = Yup.object().shape({
                    name: Yup.string().required('Nome obrigatório'),
                    email: Yup.string().required('Email obrigatório').email(),
                    password: Yup.string().min(
                        4,
                        'No minimo senha com 4 caracteres',
                    ),
                    cpf: Yup.string().required('CPF obrigatório'),
                    cep: Yup.string().required('CEP obrigatório'),
                    bairro: Yup.string().required('Bairro Obrigatório'),
                    city: Yup.string().required('Cidade obrigatória'),
                });
                await shema.validate(data, {
                    abortEarly: false,
                });

                await api.post('/usuarios', data);
                history.push('/');
                addToast({
                    type: 'sucess',
                    title: 'Cadastro realizado!',
                    description: 'Você já pode fazer seu logon no GoBarbar!',
                });
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                    return;
                }

                addToast({
                    type: 'error',
                    title: 'Erro no cadastro',
                    description:
                        'Ocorreu um erro ao fazer o cadastro, tente novamente!!',
                });
            }
        },
        [addToast, history],
    );

    return (
        <Container>
            <header>
                <div>
                    <Link to="/dashboard">
                        <FiArrowLeft />
                    </Link>
                </div>
            </header>
            <Content>
                <Form ref={formRef} initialData={{
                    name:"Helena Paixão",
                    email:"hp.helenapaixao@gmail.com",
                    cpf: "123.123.123-00"
                }} onSubmit={handleSubmit}>
                    <AvatarInput>
                        <img
                            src="https://avatars3.githubusercontent.com/u/11083288?s=460&u=195f820bdb85e57d7e08038a3f8eec821421d83d&v=4"
                            alt="Helena Paixão"
                        />
                        <button type="button">
                            <FiCamera />
                        </button>
                    </AvatarInput>
                    <h1>Meu Perfil</h1>

                    <Input
                        name="name"
                        type="text"
                        icon={FiUser}
                        placeholder="Nome"
                    />
                    <Input name="cpf" icon={FiCreditCard} placeholder="CPF" />
                    <Input
                        name="email"
                        icon={FiMail}
                        type="email"
                        placeholder="E-mail"
                    />

                    <Input
                        containerStyle={{ marginTop: 24 }}
                        name="old_password"
                        type="password"
                        icon={FiLock}
                        placeholder="Senha atual"
                    />
                    <Input
                        name="password"
                        type="password"
                        icon={FiLock}
                        placeholder="Nova senha"
                    />

                    <Input
                        name="password_confirmation"
                        type="password"
                        icon={FiLock}
                        placeholder="Confirmar senha"
                    />
                    <Button type="submit">Confirmar Mudança</Button>
                </Form>
            </Content>
        </Container>
    );
};

export default Profile;
