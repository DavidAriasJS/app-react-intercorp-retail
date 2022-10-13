import { FC } from 'react';

import logo from './../assets/logo.svg';

export const HomePage:FC = () => (
    <>  
        <br/>
        <h1>Reto Intercorp</h1>
        <div className="text-center p-10">
            <img src={logo} className="img-fluid" alt="Intercorp Retail" />
        </div>
    </>
);
