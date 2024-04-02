import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, Select, SelectItem, Input, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { PlusIcon } from '../PlusIcon';
import axiosClient from '../../axios-client';
import ModalAlert from '../configs/ModalAlert';



function ModalRegistrarMov({ fetchData }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [formData, setFormData] = useState({
        id_residuo: "",
        cantidad: "",
        usuario_adm: "",
        fk_actividad: ""
    });

    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [showAlert2, setShowAlert2] = useState(false);




    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get('http://localhost:3000/residuo/listar_admin');
                setData(response.data);
                console.log("admin", response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);


    const fetchData2 = async () => {
        try {
            const response = await axiosClient.get('http://localhost:3000/residuo/listar');
            setData2(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {


        fetchData2();
    }, []);



    const fetchData3 = async () => {
        try {
            const response = await axiosClient.get('http://localhost:3000/residuo/listar_actividad');
            setData3(response.data);
            console.log("dataaa AAAA", response.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };




    useEffect(() => {

        fetchData3();
    }, []);



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


            await axiosClient.post('http://localhost:3000/residuo/registrarmov', formData).then((response) => {

                setShowAlert(true);
                fetchData3()
                fetchData()

            })
        } catch (error) {
            console.error('Error submitting data:', error);
            setShowAlert2(true);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <Button color="primary" endContent={<PlusIcon />} onPress={onOpen}>Registrar Entrada</Button>

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Registrar Movimiento
                            </ModalHeader>
                            <ModalBody>

                                <Select
                                    autoFocus
                                    label="Residuo"
                                    placeholder="Selecciona un Residuo"
                                    name="id_residuo"
                                    value={formData.id_residuo}
                                    onChange={handleChange}
                                >

                                    <SelectItem>
                                        Seleccionar Residuo
                                    </SelectItem>

                                    {data2.map((item, index) => (
                                        <SelectItem key={item.id_residuo} value={item.id_residuo}>
                                            {item.nombre_residuo}
                                        </SelectItem>
                                    ))}
                                </Select>

                                <Select
                                    label="Adminstrador"
                                    placeholder="Selecciona un Encargado"
                                    name="usuario_adm"
                                    value={formData.usuario_adm}
                                    onChange={handleChange}
                                >

                                    <SelectItem>
                                        Seleccionar un admistrador
                                    </SelectItem>


                                    {data.map((item, index) => (
                                        <SelectItem key={item.id_usuario} value={item.id_usuario}>
                                            {item.nombre}
                                        </SelectItem>
                                    ))}
                                </Select>


                                <Select
                                    label="actividad"
                                    placeholder="Selecciona una actividad"
                                    name="fk_actividad"
                                    value={formData.fk_actividad}
                                    onChange={handleChange}
                                    disabled={!data3.length} // Deshabilita el menú desplegable si no hay actividades disponibles
                                >
                                    {data3.length ? ( // Verifica si hay actividades disponibles
                                        data3.map((item, index) => (
                                            <SelectItem key={item.id_actividad} value={item.id_actividad}>
                                                {item.nombre_act}
                                            </SelectItem>
                                        ))
                                    ) : (
                                        // Si no hay actividades, muestra un mensaje
                                        <SelectItem disabled>
                                            No hay actividades disponibles
                                        </SelectItem>
                                    )}
                                </Select>

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


export default ModalRegistrarMov
