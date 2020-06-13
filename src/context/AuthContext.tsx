import React, { createContext,useCallback, useState} from 'react';

import api from '../services/api';


interface AuthState {
    token: string;
    user: object;
}


interface sigInCredentials {
    email: string,
    password: string,
}


interface AuthContextData {
    user: object;
    signIn(credentials: sigInCredentials): Promise<void>;
    signOut(): void;

}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@CadastroUsuario:token');
        const user = localStorage.getItem('@CadastroUsuario:user');

        if (token && user) {
            return { token, user: JSON.parse(user) };
        }

        return {} as AuthState;
    });

    const signIn = useCallback(async ({ email, password }) => {
        const response = await api.post('sessions', {
            email,
            password,
        });

        const { token, user } = response.data;

        localStorage.setItem('@CadastroUsuario:token', token);
        localStorage.setItem('@CadastroUsuario:user', JSON.stringify(user));

        setData({token,user});
    }, []);

    const signOut = useCallback(() => {

        localStorage.removeItem('@GoBarber:token');
      localStorage.removeItem('@GoBarber:user');

      setData({} as AuthState);

   },[])

    return (
        <AuthContext.Provider value={{user:data.user , signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );
};

export {AuthContext, AuthProvider};