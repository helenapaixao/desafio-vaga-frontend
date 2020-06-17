import React from 'react';

import { render, fireEvent, act, wait, } from '@testing-library/react';
import AxiosMock from 'axios-mock-adapter';
import api from '../../services/api';


import Dashboard from '../../pages/Dashboard';

const mockedHistoryPush = jest.fn();

jest.mock('react-router-dom', () => {
    return {
        userHistory: () =>({
            push: mockedHistoryPush,
        }),
        Link: ({ children }: { children: React.ReactNode }) => children,
    };
});

const apiMock = new AxiosMock(api)

describe('Dashboard', () => {
    it('should be able to list all the user from your api', async () => {
        apiMock.onGet('users').reply(200, [

            {
                id: 1,
                name: 'Helena Paixão',
                email: 'hp.helenapaixao@gmail.com',
                cpf: '056.454.989-99',
                password: '123456',
                avatar_url: "https://api.adorable.io/avatars/285/abott@adorable.png",
                cidade: 'Campo Grande',
            }
        ])

        const { getAllByText, getByTestId} = render(<Dashboard />);


        await wait(() => expect(getAllByText('Helena Paixão')).toBeTruthy(), {
            timeout: 200,
        });

        expect(getAllByText('Helena Paixão')).toBeTruthy();
        expect(
            getAllByText(
                'hp.helenapaixao@gmail.com',
            ),
        ).toBeTruthy();
        expect(getByTestId('remove-user-1')).toBeTruthy();
        expect(getByTestId('edit-user-1')).toBeTruthy();

       
    });

    it('should be able to edit a user', async () => {
        apiMock.onGet('users').reply(200, [
            {
                id: 1,
                name: 'Helena Paixão',
                email: 'teste@teste.com.br',
                cpf: '056.454.989-99',
                password: '123456',
                avatar_url: "https://api.adorable.io/avatars/285/abott@adorable.png",
                cidade: 'Campo Grande',
            },
        ]);

        const { getByText, getByTestId, getByPlaceholderText } = render(
            <Dashboard />,
        );

        await wait(() => expect(getByText('Helena Paixão')).toBeTruthy(), {
            timeout: 200,
        });

        expect(getByText('Helena Paixão')).toBeTruthy();
        expect(
            getByText(
                'teste@teste.com.br',
            ),
        ).toBeTruthy();
        expect(getByTestId('remove-user-1')).toBeTruthy();
        expect(getByTestId('edit-user-1')).toBeTruthy();

        act(() => {
            fireEvent.click(getByTestId('edit-user-1'));
        });

        const inputName = getByPlaceholderText('Nome');
        const inputEmail = getByPlaceholderText('E-mail"');
        const inputPassword = getByPlaceholderText('Senha');
        const inputCPF = getByPlaceholderText('CPF');

        await act(async () => {
            fireEvent.change(inputName, { target: { value: 'Helena Paixão' } });
            fireEvent.change(inputEmail, { target: { value: 'teste@teste.com.br' } });
            fireEvent.change(inputPassword, { target: { value: '123456' } });
            fireEvent.change(inputCPF, { target: { value: '056.454.989-99' } });
        });


        expect(inputName.value).toBe('Helena Paixão');
        expect(inputEmail.value).toBe('teste@teste.com.br');
        expect(inputPassword.value).toBe(
            '123456',
        );

        apiMock.onPut('users/1').reply(200, {
            id: 1,
            name: 'Helena Paixão',
            email: 'teste@teste.com.br',
            cpf: '056.454.989-99',
            password: '123456',
            avatar_url: "https://api.adorable.io/avatars/285/abott@adorable.png",
            cidade: 'Campo Grande',
        });

        await act(async () => {
            fireEvent.click(getByTestId('edit-user-button'));
        });

        await wait(() => expect(getByText('Helena Paixão')).toBeTruthy(), {
            timeout: 200,
        });

        expect(getByText('Helena Paixão')).toBeTruthy();
        expect(
            getByText(
                'teste@teste.com.br',
            ),
        ).toBeTruthy();
        expect(getByTestId('remove-user-1')).toBeTruthy();
        expect(getByTestId('edit-user-1')).toBeTruthy();
    });

    it('should be able to remove a user plate', async () => {
        apiMock.onGet('users').reply(200, [
            {
                id: 1,
                name: 'Helena Paixão',
                email: 'teste@teste.com.br',
                cpf: '056.454.989-99',
                password: '123456',
                avatar_url: "https://api.adorable.io/avatars/285/abott@adorable.png",
                cidade: 'Campo Grande',
            },
        ]);

        apiMock.onDelete('users/1').reply(204);

        const { getByText, getByTestId } = render(<Dashboard />);

        await wait(() => expect(getByText('Helena Paixão')).toBeTruthy(), {
            timeout: 200,
        });

        expect(getByText('Helena Paixão')).toBeTruthy();
        expect(
            getByText(
                'teste@teste.com.br',
            ),
        ).toBeTruthy();
        expect(getByTestId('remove-user-1')).toBeTruthy();
        expect(getByTestId('edit-user-1')).toBeTruthy();

        await act(async () => {
            fireEvent.click(getByTestId('remove-user-1'));
        });

        it('should be able to update the availibility of a user', async () => {
            apiMock.onGet('users').reply(200, [
                {
                    id: 1,
                    name: 'Helena Paixão',
                    email: 'teste@teste.com.br',
                    cpf: '056.454.989-99',
                    password: '123456',
                    avatar_url: "https://api.adorable.io/avatars/285/abott@adorable.png",
                    cidade: 'Campo Grande',
                },
            ]);

            const { getByText, getByTestId } = render(<Dashboard />);

            await wait(() => expect(getByText('Helena Paixão')).toBeTruthy(), {
                timeout: 200,
            });

            expect(getByText('Helena Paixão')).toBeTruthy();
            expect(
                getByText(
                    'teste@teste.com.br',
                ),
            ).toBeTruthy();
            expect(getByTestId('remove-user-1')).toBeTruthy();
            expect(getByTestId('edit-user-1')).toBeTruthy();

            apiMock.onPut('users/1').reply(200, {
                id: 1,
                name: 'Helena Paixão',
                email: 'teste@teste.com.br',
                cpf: '056.454.989-99',
                password: '123456',
                avatar_url: "https://api.adorable.io/avatars/285/abott@adorable.png",
                cidade: 'Campo Grande',

            });

        });

    });
});

