import React from 'react';
import { Container, Content, Background } from './styles';
import {
    FiUser,
    FiMail,
    FiLock,
    FiCreditCard,
    FiArrowLeft,
} from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => (
    <Container>
        <Background />
        <Content>
        <form>
            <h1>Faça seu cadastro</h1>
            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiUser} placeholder="E-mail" />
            <Input name="cpf" icon={FiCreditCard} placeholder="CPF" />
            <Input name="cep" icon={FiUser} placeholder="Rua" />
            <Input name="bairro" icon={FiUser} placeholder="Bairro" />
            <Input name="city" icon={FiUser} placeholder="Cidade" />
            <Button type="submit">Cadastrar</Button>
        </form>
      
        <a href="forgot">
            <FiArrowLeft />
            Voltar para o Login
        </a>
      
        </Content>
      
    </Container>
);

export default SignUp;
