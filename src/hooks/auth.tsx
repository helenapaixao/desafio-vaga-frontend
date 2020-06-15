import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';



interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    cpf: number;
    avatar_url: string;
    endereco: string;
    numero: number;
    rua: string;
    cidade: string;
}


interface AuthState {
    id: string;
    name: string;
}

interface signInCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    id: string;
    signIn(credentials: signInCredentials): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>(() => {
        const id = localStorage.getItem('@GoBarber:token');
        const name = localStorage.getItem('@GoBarber:user');

        if (id && name) {
            return { id, name };
        }

        return {} as AuthState;
    });

    const signIn = useCallback(async ({ email, password }) => {
        const response = await api.post('users', {
            email,
            password,
        });

        const { id, name } = response.data;

        localStorage.setItem('@GoCadastro:token', id);
        localStorage.setItem('@GoCadastro:user', name);

        setData({ id, name });
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem('@GoCadastro:token');
        localStorage.removeItem('@GoCadastro:user');

        setData({} as AuthState);
    }, []);

    return (
        <AuthContext.Provider value={{ id: data.id, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
}

export { AuthProvider, useAuth };
