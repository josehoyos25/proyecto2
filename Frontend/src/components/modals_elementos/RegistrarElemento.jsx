import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, Select, SelectItem, Input, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { PlusIcon } from "../PlusIcon";
import axiosClient from '../../axios-client';
import ModalAlert from '../configs/ModalAlert';

function RegistrarElemento({ fetchData }) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [showAlert, setShowAlert] = useState(false);
    const [showAlert2, setShowAlert2] = useState(false);

    const [formData, setFormData] = useState({
        nombre_elm: "",
        tipo_elm: "",
        cantidad: ""
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
            // Aquí puedes enviar los datos a tu backend utilizando axios o fetch
            console.log(formData);
            await axiosClient.post('http://localhost:3000/elemento/registrar', formData).then((response) => {
                setShowAlert(true);

                fetchData()
            })
        } catch (error) {
            console.error('Error submitting data:', error);
            setShowAlert2(true);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <Button color="primary" endContent={<PlusIcon />} onPress={onOpen}>Registrar Elemento</Button>

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Registrar Elemento
                            </ModalHeader>
                            <ModalBody>
                                <Input
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

            

{/* 

                                <Select
                                    label="rol"
                                    placeholder="Selecciona un rol"
                                    name="rol"
                                    value={formData.unidad_medida}
                                    onChange={handleChange}
                                >
                                    <SelectItem onClick={() => setFormData({ ...formData, rol: "1" })}>
                                        Administrador
                                    </SelectItem>
                                    <SelectItem onClick={() => setFormData({ ...formData, rol: "2" })}>
                                        Pasante
                                    </SelectItem>
                                    <SelectItem onClick={() => setFormData({ ...formData, rol: "3" })}>
                                        Operario
                                    </SelectItem>

                                </Select> */}

                 


                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="primary" onClick={handleSubmit} onPress={onClose}>
                                    Registrar
                                </Button>
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


export default RegistrarElemento