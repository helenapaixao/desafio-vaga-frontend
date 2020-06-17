import React from 'react';
import SignUp from '../../pages/SignUp';
import { render, fireEvent, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const mockedHistoryPush = jest.fn();
const mockedSignIn = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
    return {
        useHistory: () => ({
            push: mockedHistoryPush,
        }),
        Link: ({ children }: { children: React.ReactNode }) => children,
    };
});

jest.mock('../../hooks/auth', () => {
    return {
        useAuth: () => ({
            signIn: mockedSignIn,
        }),
    };
});

jest.mock('../../hooks/toast', () => {
    return {
        useToast: () => ({
            addToast: mockedAddToast,
        }),
    };
});

describe('SignUp Page', () => {
    it('should be able to signup in', async () => {
        const { getByPlaceholderText, getByText } = render(<SignUp />);

        const emailField = getByPlaceholderText('E-mail');
        const passwordField = getByPlaceholderText('Senha');
        const nameField = getByPlaceholderText('Nome');
        const cpfField = getByPlaceholderText('CPF');
        const cepField = getByPlaceholderText('CEP');
        const bairroField = getByPlaceholderText('Bairro');
        const cidadeField = getByPlaceholderText('Cidade');

        const buttonElement = getByText('Cadastrar');

        fireEvent.change(emailField, {
            target: { value: 'hp.helenapaixao@gmail.com' },
        });
        fireEvent.change(passwordField, { target: { value: '123456' } });
        fireEvent.change(nameField, { target: { value: 'Helena Paixão' } });
        fireEvent.change(cpfField, { target: { value: '03212323599' } });
        fireEvent.change(cepField, { target: { value: '79041256' } });
        fireEvent.change(bairroField, { target: { value: 'São Lourenço' } });
        fireEvent.change(cidadeField, { target: { value: 'Campo Grande' } });

        fireEvent.click(buttonElement);

        await wait(() => {
            expect(mockedHistoryPush).toHaveBeenCalledWith('/signin');
            expect(mockedAddToast).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: 'success',
                }),
            );
        });
    });

    it('should not be able to sign in with invalid credentials', async () => {
        const { getByPlaceholderText, getByText } = render(<SignUp />);

        const emailField = getByPlaceholderText('E-mail');
        const passwordField = getByPlaceholderText('Senha');
        const nameField = getByPlaceholderText('Nome');
        const cpfField = getByPlaceholderText('CPF');
        const cepField = getByPlaceholderText('CEP');
        const bairroField = getByPlaceholderText('Bairro');
        const cidadeField = getByPlaceholderText('Cidade');

        const buttonElement = getByText('Cadastrar');

        fireEvent.change(emailField, { target: { value: 'not-valid-email' } });
        fireEvent.change(passwordField, { target: { value: '123456' } });
        fireEvent.change(nameField, { target: { value: 'Helena Paixão' } });
        fireEvent.change(cpfField, { target: { value: '03212323599' } });
        fireEvent.change(cepField, { target: { value: '79041256' } });
        fireEvent.change(bairroField, { target: { value: 'São Lourenço' } });
        fireEvent.change(cidadeField, { target: { value: 'Campo Grande' } });

        fireEvent.click(buttonElement);

        await wait(() => {
            expect(mockedHistoryPush).not.toHaveBeenCalledWith('/signin');
        });
    });
    it('should display an error if login fails', async () => {
        mockedSignIn.mockImplementation(() => {
            throw new Error();
        });

        const { getByPlaceholderText, getByText } = render(<SignUp />);

        const emailField = getByPlaceholderText('E-mail');
        const passwordField = getByPlaceholderText('Senha');
        const nameField = getByPlaceholderText('Nome');
        const cpfField = getByPlaceholderText('CPF');
        const cepField = getByPlaceholderText('CEP');
        const bairroField = getByPlaceholderText('Bairro');
        const cidadeField = getByPlaceholderText('Cidade');

        const buttonElement = getByText('Cadastrar');

        fireEvent.change(emailField, {
            target: { value: 'hp.helenapaixao@gmail.com' },
        });
        fireEvent.change(passwordField, { target: { value: '123456' } });
        fireEvent.change(nameField, { target: { value: 'Helena Paixão' } });
        fireEvent.change(cpfField, { target: { value: '03212323599' } });
        fireEvent.change(cepField, { target: { value: '79041256' } });
        fireEvent.change(bairroField, { target: { value: 'São Lourenço' } });
        fireEvent.change(cidadeField, { target: { value: 'Campo Grande' } });

        fireEvent.click(buttonElement);

        await wait(() => {
            expect(mockedAddToast).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: 'error',
                }),
            );
        });
    });
});
