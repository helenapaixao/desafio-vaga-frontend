
import React, { useRef, useCallback } from 'react';
import { Container, Content, Background, AnimationContainer } from './styles';

import { FiLogIn, FiMail, FiLock} from 'react-icons/fi';
import {FormHandles} from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';

import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';
import Button from '../../components/Button';
import SignUp from '../SignUp';



interface SignInFormData{
    email: string,
    password: string,
}

const SignIn: React.FC = () => {

    const formRef = useRef<FormHandles>(null);
    const { signIn } = useAuth();
    const { addToast} = useToast();
    const history = useHistory();


    const handleSubmit = useCallback(
        async (data: SignInFormData) => {
            try {
                formRef.current?.setErrors({});

                const shema = Yup.object().shape({
                    name: Yup.string().required('Nome obrigatório'),
                    email: Yup.string().required('Email obrigatório').email(),
                    password: Yup.string().required('Senha obrigatória'),
                });

                await shema.validate(data, {
                    abortEarly: false,
                });

                signIn({
                    email: data.email,
                    password: data.password,
                });
                history.push('/dashboard');
            } catch (err) {
                if(err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                }
                addToast({
                    type: 'error',
                    title: 'Erro na autenticação',
                    description:
                        'Ocorreu um erro ao fazer o login, cheque as credenciais ',
                });
            }
        },
        [signIn, addToast, history],
    );
    return (
        <Container>
            <Content>
            <AnimationContainer>
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Faça seu logon</h1>
                        <Input
                            name="email"
                            icon={FiMail}
                            placeholder="E-mail"
                        />
                        <Input
                            name="password"
                            icon={FiLock}
                            type="password"
                            placeholder="Senha"
                        />
                        <Button type="submit">Entrar</Button>
                        <a href="forgot"> Esqueci minha senha</a>
                    </Form>
                    <Link to="/signup">
                        <FiLogIn />
                        Criar Conta
                    </Link>
                </AnimationContainer>
            </Content>
            <Background/>
        </Container>
    );
};

export default SignIn;