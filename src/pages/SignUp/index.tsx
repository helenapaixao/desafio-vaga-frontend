import React,{useCallback} from 'react';
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

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
const handleSubmit = useCallback(async (data: object) => {
    try {
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
            abortEarly:false
        })
    }catch (err) {
        console.log(err);
    }
},[])
    return (
        <Container>
            <Background />
            <Content>
                <Form onSubmit={handleSubmit}>
                    <h1>Faça seu cadastro</h1>
                    <Input name="name" icon={FiUser} placeholder="Nome" />
                    {/* <Input
                        name="email"
                        icon={FiMail}
                        type="email"
                        placeholder="E-mail"
                    /> */}
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
