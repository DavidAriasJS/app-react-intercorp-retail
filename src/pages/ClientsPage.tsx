import { FC, useContext, useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import { schema } from '../schemas';
import { getClients, registerClient } from '../api/client';
import { AppContext } from '../contexts';

import convertBirthday from '../utils/convertBirthday';
import calculateAge from '../utils/calculateAge';
import { IClient } from '../interfaces';

export const ClientsPage:FC = () => {
    const [ showModal, setShowModal ] = useState(false);
    const [ showAlert, setShowAlert ] = useState(false);
    const [ clientIdRegister, setClientIdRegister ] = useState('');
    //const [ listClients, setListClients ] = useState<IClient[]>([]);

    const { isLoading, toggleLoading, clients, setClients } = useContext(AppContext);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => {
        reset();
        setShowModal(true);
    };

    const { register, handleSubmit, reset, formState: { errors } } = useForm<IClient>({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data: IClient) => {
        toggleLoading && toggleLoading(true);

        const respClient = await registerClient(data);

        handleCloseModal();
        toggleLoading && toggleLoading(false);
        setShowAlert(true);

        respClient?.id && setClientIdRegister(respClient.id);

        //Refrescar listado clientes
        await getListClients();

        //Ocultar Alerta
        setTimeout(() => {
            setShowAlert(false);
        }, 5000);
    };

    const getListClients = async () => {
        const list = await getClients();
        //await setListClients(list);
        setClients && setClients(list);

    }

    useEffect(() => {
        getListClients();
    }, []);
    

    return (
        <>
            <br/>
            <div className='d-flex'>
                <h1>Clientes ({clients.length})</h1>
            </div>
            {showAlert && <Alert variant="success">
                Se guardo correctamente el cliente <b>{clientIdRegister}</b>
            </Alert>}
            <div className='d-flex'>
                <Button variant="primary" onClick={handleShowModal}>Nuevo Cliente</Button>
            </div>
            <hr/>
            {clients?.length > 0 
                ? <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Fecha de nacimiento</th>
                            <th>Edad</th>
                        </tr>
                    </thead>
                    <tbody>
                        { clients.map((client, i) => (
                            <tr key={ i }>
                                <td>{ i + 1 }</td>
                                <td>{ client.firstName }</td>
                                <td>{ client.lastName }</td>
                                <td>{ convertBirthday(client?.birthday?.seconds) }</td>
                                <td>{ calculateAge(client?.birthday?.seconds) }</td>
                            </tr>
                        )) }
                    </tbody>
                </Table> 
                : <Alert variant="info">
                    Sin registro de clientes
                </Alert>
        
            }
            

        <Modal
            show={showModal}
            onHide={handleCloseModal}
            backdrop="static"
            keyboard={false}>
            <form  onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                <Modal.Title>Nuevo cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="floatingInputCustom"
                            type="text"
                            {...register("firstName")}
                            placeholder="Nombre"
                            isInvalid={!!errors.firstName}
                        />
                        <label htmlFor="floatingInputCustom">Nombre</label>
                        <Form.Control.Feedback type="invalid">
                            {errors.firstName?.message}
                        </Form.Control.Feedback>
                    </Form.Floating>

                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="floatingInputCustom"
                            type="text"
                            placeholder="Apellidos"
                            isInvalid={!!errors.lastName}
                            {...register("lastName")}
                        />
                        <label htmlFor="floatingInputCustom">Apellidos</label>
                        <Form.Control.Feedback type="invalid">
                            {errors.lastName?.message}
                        </Form.Control.Feedback>
                    </Form.Floating>

                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="floatingInputCustom"
                            type="date"
                            isInvalid={!!errors.birthday}
                            {...register("birthday")}
                            placeholder="Fecha Nacimiento"
                        />
                        <label htmlFor="floatingInputCustom">Fecha de nacimiento</label>
                        <Form.Control.Feedback type="invalid">
                            {errors.birthday?.message}
                        </Form.Control.Feedback>
                    </Form.Floating>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" disabled={isLoading} onClick={handleCloseModal}>
                    Cerrar
                </Button>
                <Button type="submit" disabled={isLoading} variant="primary">{isLoading ? 'Guardando...' : 'Guardar'}</Button>
                </Modal.Footer>
            </form>
        </Modal>

        </>
    );
};
