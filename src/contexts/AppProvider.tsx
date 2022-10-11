import React, { FC, ReactNode } from 'react';
import { AppContext, defaultState } from './AppContext';
import { useState } from 'react';

interface IAppProviderProps {
    children: ReactNode
}

export const AppProvider:FC<IAppProviderProps> = ({ children }) => {

    const [dark, setDark] = useState(defaultState.dark);

    const toggleDark = () => {
        setDark(!dark);
    };

    return (
        <AppContext.Provider
            value={{
                dark,
                toggleDark
            }}>
        { children }
        </AppContext.Provider>
    );
};