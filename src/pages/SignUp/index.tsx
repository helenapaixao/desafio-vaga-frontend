import React from 'react';
import { Container, Content, Background } from './styles';
import {
    FiUser,
    FiMail,
    FiLock,
    FiCreditCard,
    FiArrowLeft,
    FiSend,
} from 'react-icons/fi';

import { Form } from '@unform/web';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {

    function handleSubmit(data:object):void {
        console.log(data);
    }

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
