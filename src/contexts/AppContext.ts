import { createContext } from 'react';
import { IClient } from '../interfaces';

interface IAppContext {
    isLoading: boolean;
    toggleLoading?: (toggle: boolean) => void;
    clients: IClient[];
    setClients?: React.Dispatch<React.SetStateAction<IClient[]>>;
  }

export const defaultState = {
  isLoading: false,
  clients: [] as IClient[]
};

export const AppContext = createContext<IAppContext>(defaultState);