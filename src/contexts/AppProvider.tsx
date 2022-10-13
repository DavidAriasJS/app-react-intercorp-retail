import { FC, ReactNode, useState } from 'react';
import { AppContext, defaultState } from './AppContext';
import { IClient } from '../interfaces/client.interface';

interface IAppProviderProps {
    children: ReactNode
}

export const AppProvider:FC<IAppProviderProps> = ({ children }) => {

    const [isLoading, setIsLoading] = useState<boolean>(defaultState.isLoading);
    const [clients, setClients] = useState<IClient[]>(defaultState.clients);

    const toggleLoading = (toggle: boolean) => {
        setIsLoading(toggle);
    };

    const toggleClients = (clients: IClient[]) => {
        setClients(clients);
    }

    return (
        <AppContext.Provider
            value={{
                isLoading,
                toggleLoading,
                clients,
                toggleClients
            }}>
        { children }
        </AppContext.Provider>
    );
};