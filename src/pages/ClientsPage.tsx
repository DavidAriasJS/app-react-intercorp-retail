import { FC, useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { schema } from '../schemas';

interface IFormInputs {
    firstName: string;
    lastName: string;
    birthday: string;
};

export const ClientsPage:FC = () => {

    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => {
        reset();
        setShowModal(true);
    };

    const { register, handleSubmit, reset, formState: { errors } } = useForm<IFormInputs>({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: IFormInputs) => {
        console.log(data);
        
    };

    return (
        <>
            <br/>
            <div className='d-flex'>
                <h1>Clientes</h1>
            </div>
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
                <Button variant="secondary" onClick={handleCloseModal}>
                    Cerrar
                </Button>
                <Button type="submit" variant="primary">Guardar</Button>
                </Modal.Footer>
            </form>
        </Modal>

        </>
    );
};
