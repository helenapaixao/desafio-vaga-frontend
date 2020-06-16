import React, {
    useCallback,
    useRef,
    useEffect,
    useState,
    ChangeEvent,
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
import { useToast } from '../../hooks/toast';

import axios from 'axios';
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

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
    cpf: string;
    cep: string;
    bairro: string;
    cidade: string;
}

interface CEPResponse {
    bairro: string;
    logradouro: string;
    localidade: string;
}

const SignUp: React.FC = () => {
    const [selectedCep, setSelectedCep] = useState('');
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();

    function handleCEP(event: ChangeEvent<HTMLInputElement>) {
        const cep = event.target.value;
        setSelectedCep(cep);
    }

    //function handleBairro(event: ChangeEvent<HTMLInputElement>) {
    //  const bairro = event.target.value;
    //  setSelectedBairro(bairro);

    // }

    useEffect(() => {
        if (selectedCep === '') {
            return;
        }

        axios
            .get<CEPResponse[]>(
                `https://webmaniabr.com/api/1/cep/${selectedCep}/?app_key=kIgtLog0Mm2x10vZpFMt0jvW2vCRj3s5&app_secret=w7BIRk4quymQD2VJZaLSOMzId35eYGQZ7O2Xtn1gvVgepC6u`,
            )
            .then(response => {});
    }, [selectedCep]);

    const handleSubmit = useCallback(
        async (data: SignUpFormData) => {
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

                await api.post('/users', data);
                history.push('/');
                addToast({
                    type: 'success',
                    title: 'Cadastro realizado! 🚀',
                    description: 'Você já pode fazer seu logon no GoBarber! 🔥',
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
                    <img src={logoImg} alt="GoBarber" />
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Faça seu cadastro</h1>
                        <Input
                            name="name"
                            type="text"
                            icon={FiUser}
                            placeholder="Nome"
                        />
                        <Input
                            name="cpf"
                            icon={FiCreditCard}
                            placeholder="CPF"
                        />
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
                            value={selectedCep}
                            onChange={handleCEP}
                        />
                        <Input
                            name="bairro"
                            icon={FiSend}
                            placeholder="Bairro"
                            onChange={handleCEP}
                        />
                        <Input
                            name="cidade"
                            icon={FiSend}
                            placeholder="Cidade"
                        />
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
