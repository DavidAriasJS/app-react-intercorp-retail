import { FC, useContext, useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { schema } from '../schemas';
import { getClients, registerClient } from '../api/client';
import { AppContext } from '../contexts';

import convertBirthday from '../utils/convertBirthday';
import { IClient } from '../interfaces';
import calculateDeathAge from '../utils/calculateDeathAge';

export const ClientsPage:FC = () => {
    const [ showModal, setShowModal ] = useState(false);
    const [ showAlert, setShowAlert ] = useState(false);
    const [ clientRegister, setClientRegister ] = useState('');

    const { isLoading, toggleLoading, clients, toggleClients  } = useContext(AppContext);

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

        respClient?.id && setClientRegister(data.firstName);

        //Refrescar listado clientes
        getListClients();

        //Ocultar Alerta
        setTimeout(() => {
            setShowAlert(false);
        }, 5000);
    };
    
    const getListClients = async () => {
      const list = await getClients();
      toggleClients && toggleClients(list);
    }

    const ModalForm = () => (
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
                            id="firstName"
                            type="text"
                            {...register("firstName")}
                            placeholder="Nombre"
                            isInvalid={!!errors.firstName}
                        />
                        <label htmlFor="firstName">Nombre</label>
                        <Form.Control.Feedback type="invalid">
                            {errors.firstName?.message}
                        </Form.Control.Feedback>
                    </Form.Floating>

                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="lastName"
                            type="text"
                            placeholder="Apellidos"
                            isInvalid={!!errors.lastName}
                            {...register("lastName")}
                        />
                        <label htmlFor="lastName">Apellidos</label>
                        <Form.Control.Feedback type="invalid">
                            {errors.lastName?.message}
                        </Form.Control.Feedback>
                    </Form.Floating>

                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="birthday"
                            type="date"
                            isInvalid={!!errors.birthday}
                            {...register("birthday")}
                            placeholder="Fecha Nacimiento"
                        />
                        <label htmlFor="birthday">Fecha de nacimiento</label>
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
    );
  
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
                Se guardo correctamente el cliente <b>{clientRegister}</b>
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
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Edad</th>
                            <th>Fecha de nacimiento</th>
                            <th>
                                Edad de muerte <br />
                                <h6>Esperanza de vida</h6>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { clients.map((client, i) => (
                            <tr key={ i }>
                                <td>{ i + 1 }</td>
                                <td>{ client.firstName }</td>
                                <td>{ client.lastName }</td>
                                <td>{ client.age }</td>
                                <td>{ convertBirthday(client?.birthday?.seconds) }</td>
                                <td>{ calculateDeathAge(client.age) }</td>
                            </tr>
                        )) }
                    </tbody>
                </Table> 
                : <Alert variant="info">
                    Sin registro de clientes
                </Alert>
            }
            <ModalForm />
        </>
    );
};
