import React, { FC, ReactNode } from 'react';
import { AppContext, defaultState } from './AppContext';
import { useState } from 'react';
import { IClient } from '../interfaces/clientInterface';

interface IAppProviderProps {
    children: ReactNode
}

export const AppProvider:FC<IAppProviderProps> = ({ children }) => {

    const [isLoading, setIsLoading] = useState(defaultState.isLoading);
    const [clients, setClients] = useState<IClient[]>(defaultState.clients);

    const toggleLoading = (toggle: boolean) => {
        setIsLoading(toggle);
    };

    return (
        <AppContext.Provider
            value={{
                isLoading,
                toggleLoading,
                clients,
                setClients
            }}>
        { children }
        </AppContext.Provider>
    );
};