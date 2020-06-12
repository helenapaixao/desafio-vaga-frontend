import React from 'react';
import {Container,Content, Background} from './styles'
import {FiLogIn, FiMail, FiLock} from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = () => (
<Container>

    <Content>
        {/* <img src={}> */}
            <form>
                <h1>Faça seu Login</h1>
                {/* <Input
                        name="email"
                        icon={FiMail}
                        type="email"
                        placeholder="E-mail"
                    /> */}
               {/* <Input  type="password" name="password" icon={FiLock} placeholder="Senha"/> */}
               <Button type="submit">Entrar</Button>
               <a href="forgot">Esqueci minha senha</a>
            </form>
            <a href="/SignUp">
                <FiLogIn/>
                Criar Conta
            </a>
    </Content>
    <Background/>

   
</Container>
);


export default SignIn;