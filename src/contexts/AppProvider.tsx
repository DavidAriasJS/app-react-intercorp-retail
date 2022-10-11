import React, { FC, ReactNode } from 'react';
import { AppContext, defaultState } from './AppContext';
import { useState } from 'react';

interface IAppProviderProps {
    children: ReactNode
}

export const AppProvider:FC<IAppProviderProps> = ({ children }) => {

    const [isLoading, setIsLoading] = useState(defaultState.isLoading);

    const toggleLoading = (toggle: boolean) => {
        setIsLoading(toggle);
    };

    return (
        <AppContext.Provider
            value={{
                isLoading,
                toggleLoading
            }}>
        { children }
        </AppContext.Provider>
    );
};