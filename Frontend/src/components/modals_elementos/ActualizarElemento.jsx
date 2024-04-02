import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, Input, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import axiosClient from '../../axios-client';
import { EditIcon } from '../icons/EditIcon';
import ModalAlert from '../configs/ModalAlert';


function ActualizarElemento({ fetchData, elemento }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [showAlert, setShowAlert] = useState(false);
    const [showAlert2, setShowAlert2] = useState(false);


    const [formData, setFormData] = useState({
        nombre_elm: elemento.nombre_elm,
        tipo_elm: elemento.tipo_elm,
        cantidad: elemento.cantidad
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleSubmit = async () => {
        try {
            console.log(formData);
        
            await axiosClient.put(`http://localhost:3000/elemento/actualizar/${elemento.id_elemento}`, formData).then(() => {
                fetchData();
            });

            setShowAlert(true);

            onOpenChange(false);
        } catch (error) {
            console.error('Error submitting data:', error);
            onOpenChange(false);
            setShowAlert2(true);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <Button color="" className='w-10 text-blue-600' onPress={onOpen}>
                <EditIcon />
            </Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Actualizar Usuario</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    label="Nombre"
                                    placeholder="Enter nombre"
                                    variant="bordered"
                                    name="nombre_elm"
                                    value={formData.nombre_elm}
                                    onChange={handleChange}
                                />
                                <Input
                                    autoFocus
                                    label="tipo_elm"
                                    placeholder="Enter tipo_elm"
                                    variant="bordered"
                                    name="tipo_elm"
                                    value={formData.tipo_elm}
                                    onChange={handleChange}
                                />
                                <Input
                                    label="cantidad"
                                    placeholder="Enter cantidad"
                                    variant="bordered"
                                    name="cantidad"
                                    value={formData.cantidad}
                                    onChange={handleChange}
                                />
                             
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>Cerrar</Button>
                                <Button color="primary" onClick={handleSubmit} onPress={onClose}>Actualizar</Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            {showAlert && <ModalAlert mensaje="Movimiento Registrado con éxito" />}
            {showAlert2 && <ModalAlert mensaje="Movimiento No Registrado" />}

        </div>
    );
}


export default ActualizarElemento