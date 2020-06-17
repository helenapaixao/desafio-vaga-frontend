import { renderHook } from '@testing-library/react-hooks';
import { useAuth, AuthProvider } from '../../hooks/auth';
import MockAdapter from 'axios-mock-adapter';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

describe('Auth hook', () => {
    it('should be able to sign in', async () => {
        apiMock.onPost('sessions').reply(200, {
            users: {
                id: '1',
                name: 'Helena Paixão',
                email: 'hp.helenapaixao@gmail.com',
            },
        });

        const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

        const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
            wrapper: AuthProvider,
        });
        result.current.signIn({
            email: 'hp.helenapaixao@gmail.com',
            password: '123456',
        });


        await waitForNextUpdate();

        expect(setItemSpy).toHaveBeenCalledTimes(2);
    });
});
