import React from 'react';

import GlobalStyle from './styles/global';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../src/routes/index';

import AppProvider from './hooks/index';

const App: React.FC = () => (
    <Router>
        <AppProvider>
            <Routes />
        </AppProvider>

        <GlobalStyle />
    </Router>
);
export default App;
