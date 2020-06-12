import React,{useCallback, useRef} from 'react';
import { Container, Content, Background } from './styles';
import {
    FiUser,
    FiMail,
    FiLock,
    FiCreditCard,
    FiArrowLeft,
    FiSend,
} from 'react-icons/fi';

import * as Yup from 'yup'

import { Form } from '@unform/web';
import {FormHandles} from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';

const SignUp: React.FC = () => {
const formRef = useRef<FormHandles>(null)

const handleSubmit = useCallback(async (data: object) => {
    try {
        formRef.current?.setErrors([]);
        const shema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatório'),
            email: Yup.string().required('Email obrigatório').email(),
            password: Yup.string().min(4, 'No minimo senha com 4 caracteres'),
            cpf: Yup.string().required('CPF obrigatório'),
            cep: Yup.string().required('CEP obrigatório'),
            bairro: Yup.string().required('Bairro Obrigatório'),
            city: Yup.string().required('Cidade obrigatória'),

        })
        await shema.validate(data, {
            abortEarly:false,
        })
    }catch (err) {
        console.log(err);
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
    }
},[])
    return (
        <Container>
            <Background />
            <Content>
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu cadastro</h1>
                    <Input name="name"type="text" icon={FiUser} placeholder="Nome" />
                    <Input
                        name="email"
                        icon={FiMail}
                        type="email"
                        placeholder="E-mail"
                    />
                    <Input name="password" type="password" icon={FiLock} placeholder="Senha" />
                    <Input name="cpf" icon={FiCreditCard} placeholder="CPF" />
                    <Input name="cep" icon={FiSend} placeholder="Rua" />
                    <Input name="bairro" icon={FiSend} placeholder="Bairro" />
                    <Input name="city" icon={FiSend} placeholder="Cidade" />
                    <Button type="submit">Cadastrar</Button>
                </Form>

                <a href="forgot">
                    <FiArrowLeft />
                    Voltar para o Login
                </a>
            </Content>
        </Container>
    );
};

export default SignUp;
