import { createContext } from 'react';

interface IAppContext {
    isLoading: boolean;
    toggleLoading?: (toggle: boolean) => void;
  }

export const defaultState = {
  isLoading: false,
};

export const AppContext = createContext<IAppContext>(defaultState);