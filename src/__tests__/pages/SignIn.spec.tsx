import React from 'react';
import SignIn from '../../pages/SignIn';
import { render, fireEvent, wait } from '@testing-library/react';

const mockedHistoryPush = jest.fn();
const mockedToast = jest.fn();

jest.mock('react-router-dom', () => {
    return {
        userHistory: () => ({
            push: mockedHistoryPush,
        }),
        Link: ({ children }: { children: React.ReactNode }) => children,
    };
});

jest.mock('../../hooks/auth', () => {
    return {
        useAuth: () => ({
            signIn: jest.fn(),
        }),
    };
});


jest.mock('../../hooks/toast', () => {
    return {
        addToast: () => ({
            addToast: jest.fn(),
        }),
        useToast: () => ({
            signIn: jest.fn(),
        }),
    };
});

describe('SignIn Page', () => {
    it('should be able to sign in', async () => {
        const { getByPlaceholderText, getByText } = render(<SignIn />);
        const emailField = getByPlaceholderText('E-mail');
        const passwordField = getByPlaceholderText('Senha');
        const buttonElement = getByText('Entrar');

        fireEvent.change(emailField, {
            target: { value: 'hp.helenapaixao@gmail.com' },
        });
        fireEvent.change(passwordField, { target: { value: '123456' } });

        fireEvent.click(buttonElement);

        await wait(() => {
            expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
           
        });
    });
});
