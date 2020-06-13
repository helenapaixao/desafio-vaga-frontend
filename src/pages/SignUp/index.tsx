import React, {
    useCallback,
    useRef,
    useState,
} from 'react';
import { Container, Content, AnimationContainer, Background } from './styles';
import {
    FiUser,
    FiMail,
    FiLock,
    FiCreditCard,
    FiArrowLeft,
    FiSend,
} from 'react-icons/fi';

import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

import axios from 'axios';

import * as Yup from 'yup';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}



const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();
    const [ceps, setCeps] = useState<string[]>([]);
    const [selectedCEP, setSelectedCEP] = useState<string[]>([]);


    



    const handleSubmit = useCallback(async (data: SignUpFormData) => {
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
            await api.post('/usuarios', data);
            history.push('/');
            addToast({
                type: 'sucess',
                title: 'Cadastro realizado!',
                description: 'Você já pode fazer seu login',
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
            <Background />
            <Content>
            <AnimationContainer>
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu cadastro</h1>
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
                        name="password"
                        type="password"
                        icon={FiLock}
                        placeholder="Senha"
                    />

                    <Input
                        name="cep"
                        icon={FiSend}
                        placeholder="CEP"
                        value={selectedCEP}
                    />
                    <Input name="bairro" icon={FiSend} placeholder="Bairro" />
                    <Input name="city" icon={FiSend} placeholder="Cidade" />
                    <Button type="submit">Cadastrar</Button>
                </Form>

                <Link to="/">
                        <FiArrowLeft />
                        Voltar para Login
                    </Link>
                </AnimationContainer>
            </Content>
        </Container>
    );
};

export default SignUp;
