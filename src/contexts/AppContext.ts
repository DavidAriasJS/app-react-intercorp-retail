import { createContext } from 'react';

interface IAppContext {
    dark: boolean;
    toggleDark?: () => void;
  }

export const defaultState = {
    dark: false,
};

export const AppContext = createContext<IAppContext>(defaultState);