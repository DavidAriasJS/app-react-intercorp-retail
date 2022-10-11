import { FC, useContext } from "react";
import Button from 'react-bootstrap/Button';
import { AppContext } from "../contexts";

export const HomePage:FC = () => {
    
    const { dark, toggleDark } = useContext(AppContext);

    return (
        <>
            <h1>HomeApp</h1>
            <Button onClick={toggleDark}>Cambiar Thema</Button>
            { dark  ? 'ACTIVO DARK' : 'INACTIVO DARK' }
        </>
    );
};
