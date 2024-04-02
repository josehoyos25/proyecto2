import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, Select, SelectItem, Input, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { PlusIcon } from "../PlusIcon";
import axiosClient from '../../axios-client';
import ModalAlert from '../configs/ModalAlert';

function RegistrarUsuario({ fetchData }) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [showAlert, setShowAlert] = useState(false);
    const [showAlert2, setShowAlert2] = useState(false);

    const [formData, setFormData] = useState({
        nombre: "",
        apellidos: "",
        identificacion: "",
        email: "",
        rol: "",
        password: ""
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
            await axiosClient.post('http://localhost:3000/usuario/registrar', formData).then((response) => {
      
                setShowAlert(true);
            })
        } catch (error) {
            console.error('Error submitting data:', error);
            setShowAlert2(true);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <Button color="primary" endContent={<PlusIcon />} onPress={onOpen}>Registrar Usuario</Button>

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Registrar Usuario
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    label="Nombre"
                                    placeholder="Enter nombre"
                                    variant="bordered"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                />
                                <Input
                                    autoFocus
                                    label="apellidos"
                                    placeholder="Enter apellidos"
                                    variant="bordered"
                                    name="apellidos"
                                    value={formData.apellidos}
                                    onChange={handleChange}
                                />

                                <Input

                                    label="identificacion"
                                    placeholder="Enter identificacion"
                                    variant="bordered"
                                    name="identificacion"
                                    value={formData.identificacion}
                                    onChange={handleChange}
                                />

                                <Input

                                    label="email"
                                    placeholder="Enter email"
                                    variant="bordered"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />



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

                                </Select>

                                <Input

                                    label="password"
                                    placeholder="Enter password"
                                    variant="bordered"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />





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

export default RegistrarUsuario