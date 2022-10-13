import { FC, useContext, useEffect, useState } from 'react';
import { BarChart, Tooltip, CartesianGrid, Bar, ResponsiveContainer , XAxis} from 'recharts';
import { getClients } from '../api/client';
import { AppContext } from '../contexts';
import { IGetAnalysis } from '../interfaces';
import getAnalysis from '../utils/getAnalysis';

export const AnalysisPage:FC = () => {
    const isResponsive = window.matchMedia('(max-width: 480px)').matches;

    const { clients, toggleClients } = useContext(AppContext);
    
    const [ customerAnalysis,  setCustomerAnalysis ] = useState<IGetAnalysis>({} as IGetAnalysis);

    const getListClients = async () => {
        const list = await getClients();
        toggleClients && toggleClients(list);
        const ages = list.map(client => client.age);
        setCustomerAnalysis && setCustomerAnalysis(await getAnalysis(ages));
    }

    useEffect(() => {
        getListClients();
      }, []);

    return (
        <>
        <br/>
            <h1>Dashboard</h1>
            <div className='p-4'>
                <ResponsiveContainer width={isResponsive ? 420 : 420} height={200}>
                    <BarChart
                        width={isResponsive ? 420 : 420}
                        height={200}
                        data={clients}
                        margin={{
                            top: 20,
                            bottom: 0
                        }}
                    >
                        <CartesianGrid strokeDasharray="2 2" />
                        <XAxis dataKey="fullName" hide/>
                        <Tooltip />
                        <Bar dataKey="age" fill="#0d4bd8" />
                    </BarChart>
                </ResponsiveContainer>
                <div className="d-flex flex-column align-items-start">
                    <div className="p-2">
                        <label className='font-weight-bold'><b>Total cliente(s)</b></label> : {clients.length || 0}
                    </div>
                    <div className="p-2">
                        <label className='font-weight-bold'><b>Desviación Estandar</b></label> : {customerAnalysis.averageAge}
                    </div>
                    <div className="p-2">
                        <label className='font-weight-bold'><b>Edad Promedio</b></label> : {customerAnalysis.standardDeviation}
                    </div>
                </div>
            </div>
        </>
    );
};
