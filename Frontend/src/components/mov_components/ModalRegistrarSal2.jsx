import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, Select, SelectItem, Input, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { PlusIcon } from '../PlusIcon';
import axiosClient from '../../axios-client';
import { DeleteIcon } from '../icons/DeleteIcon';
import ModalAlert from '../configs/ModalAlert';



function ModalRegistrarSal2({ fetchData, residuos }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [formData, setFormData] = useState({
        id_residuo: residuos.id_residuo,
        usuario_adm: "",
        destino: "",
        cantidad: residuos.cantidad
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

    useEffect(() => {
        const fetchData2 = async () => {
            try {
                const response = await axiosClient.get('http://localhost:3000/residuo/listar');
                setData2(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData2();
    }, []);

    useEffect(() => {
        const fetchData3 = async () => {
            try {
                const response = await axiosClient.get('http://localhost:3000/residuo/listar_empresas');
                setData3(response.data);
                console.log("dataaa AAAA", response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

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
  
            await axiosClient.post('http://localhost:3000/residuo/registrarsalida', formData).then((response) => {
                console.log(response.data)
                fetchData()
                setShowAlert(true);
            })
        } catch (error) {
            console.error('Error submitting data:', error);
            setShowAlert2(true);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <Button color="" className='w-10' onPress={onOpen}><DeleteIcon /></Button>

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


                                {/* <Input
                                    label="Residuo"
                                    placeholder="Selecciona un Residuo"
                                    name="id_residuo"
                                    variant="bordered"
                                    value={id_residuo}
                                    onChange={handleChange}
                                /> */}


                                <Select
                                    label="Adminstrador"
                                    placeholder="Selecciona un Encargado"
                                    name="usuario_adm"
                                    value={formData.usuario_adm}
                                    onChange={handleChange}
                                >
                                    {data.map((item, index) => (
                                        <SelectItem key={item.id_usuario} value={item.id_usuario}>
                                            {item.nombre}
                                        </SelectItem>
                                    ))}
                                </Select>


                                <Select
                                    label="destino"
                                    placeholder="Selecciona una Empresa"
                                    name="destino"
                                    value={formData.destino}
                                    onChange={handleChange}
                                >
                                    {data3.map((item, index) => (
                                        <SelectItem key={item.id_empresa} value={item.id_empresa}>
                                            {item.nombre_empresa}
                                        </SelectItem>
                                    ))}
                                </Select>

                                <Input
                                disabled
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



export default ModalRegistrarSal2