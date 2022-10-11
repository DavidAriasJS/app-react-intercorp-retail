import { FC, useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { addDoc, collection } from "firebase/firestore";

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { schema } from '../schemas';
import { IClient } from '../interfaces';
import { registerClient } from '../api/client';
import dbFirestore from '../api/firestore';
import { AppContext } from '../contexts';

import Alert from 'react-bootstrap/Alert';

export const ClientsPage:FC = () => {
    const [ showModal, setShowModal ] = useState(false);

    const { isLoading, toggleLoading } = useContext(AppContext);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => {
        reset();
        setShowModal(true);
    };

    const { register, handleSubmit, reset, formState: { errors } } = useForm<IClient>({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data: IClient) => {
        console.log(data);
        toggleLoading && toggleLoading(true);
        const id = await registerClient(data);
        handleCloseModal();
        toggleLoading && toggleLoading(false);
    };

    return (
        <>
            <br/>
            <div className='d-flex'>
                <h1>Clientes</h1>
            </div>
            <Alert variant="success">
                Se guardo correctamente
            </Alert>
            <div className='d-flex'>
                <Button variant="primary" onClick={handleShowModal}>Nuevo Cliente</Button>
            </div>
            <hr/>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr>
                </tbody>
            </Table>

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
