import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, Select, SelectItem, Input, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import axiosClient from '../../axios-client';
import { EditIcon } from '../icons/EditIcon';
import { Autocomplete, AutocompleteSection, AutocompleteItem } from "@nextui-org/autocomplete";
import ModalAlert from '../configs/ModalAlert';


function ModalActualizarResiduos({ fetchData, residuos }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [showAlert, setShowAlert] = useState(false);
    const [showAlert2, setShowAlert2] = useState(false);


    const [formData, setFormData] = useState({
        nombre_residuo: residuos.nombre_residuo,
        residuo: residuos.residuo,
        tipo_residuo: residuos.tipo_residuo,
        unidad_medida: residuos.unidad_medida,
        fk_alm: residuos.fk_alm
    });




    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);


    let id = residuos.id_residuo
    let nombre_residuo = residuos.nombre_residuo
    let residuo = residuos.residuo
    let tipo_residuo = residuos.tipo_residuo

    let unidad_medida = residuos.unidad_medida
    let fk_alm = residuos.fk_alm



    useEffect(() => {
        const fetchData1 = async () => {
            try {
                const response = await axiosClient.get('http://localhost:3000/residuo/listar_tipos');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData1();
    }, []);

    useEffect(() => {
        const fetchData2 = async () => {
            try {
                const response = await axiosClient.get('http://localhost:3000/residuo/listar_alm');
                setData2(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData2();
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
            console.log(formData);
            alert("Datos actualizados correctamente");

            await axiosClient.put(`http://localhost:3000/residuo/actualizar/${residuos.id_residuo}`, formData).then((response) => {
                onOpenChange(false);
                console.log(response.data)
                fetchData()
            })

            

                
            setShowAlert(true);
       



        } catch (error) {
            console.error('Error submitting data:', error);
            onOpenChange(false);
            setShowAlert2(true);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <Button color="" className='w-10 text-blue-600' onPress={onOpen}>   <EditIcon /></Button>


            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Actualizar</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    label="Nombre"
                                    placeholder="Enter nombre"
                                    variant="bordered"
                                    name="nombre_residuo"
                                    defaultItems={nombre_residuo}
                                    value={formData.nombre_residuo || nombre_residuo}
                                    onChange={handleChange}
                                />

                                {/* 
                                <Select
                                    label="Residuo"
                                    placeholder="Seleccione un Residuo"
                                    name="residuo"
                                    value={formData.residuo}
                                    defaultItems={residuo}
                                    onChange={handleChange}
                                >
                                    <SelectItem onClick={() => setFormData({ ...formData, residuo: "1" })}>
                                        No peligrosos
                                    </SelectItem>
                                    <SelectItem onClick={() => setFormData({ ...formData, residuo: "2" })}>
                                        Peligrosos
                                    </SelectItem>
                                </Select> */}


                                <Input
                                    label="Residuo"

                                    placeholder="Seleccione un Residuo"
                                    name="residuo"
                                    value={formData.residuo}
                                    defaultItems={residuo}
                                    onChange={handleChange}
                                />



                                {/* <Select
                                    label="Tipo Residuo"
                                    placeholder="Selecciona un Residuo"
                                    name="tipo_residuo"
                                    defaultItems={tipo_residuo}
                                    value={formData.tipo_residuo || tipo_residuo}
                                    onChange={handleChange}
                                >
                                    {data.map((item, index) => (
                                        <SelectItem key={item.id_tipo} value={item.id_tipo}>
                                            {item.tipo_residuo}
                                        </SelectItem>
                                    ))}
                                </Select> */}


                                <Input
                                    label="Tipo Residuo"
                                    placeholder="Selecciona un Residuo"
                                    name="tipo_residuo"
                                    defaultItems={tipo_residuo}
                                    value={formData.tipo_residuo || tipo_residuo}
                                    onChange={handleChange}
                                />


                                {/* <Input

                                    label="Cantidad"
                                    placeholder="Enter cantidad"
                                    variant="bordered"
                                    name="cantidad"
                                    defaultItems={cantidad}
                                    value={formData.cantidad || cantidad}
                                    onChange={handleChange}
                                /> */}

                                {/* <Select
                                    label="Unidad medida"
                                    placeholder="Selecciona una unidad"
                                    name="unidad_medida"
                                    defaultItems={unidad_medida}
                                    value={formData.unidad_medida}
                                    onChange={handleChange}
                                >
                                    <SelectItem onClick={() => setFormData({ ...formData, unidad_medida: "1" })}>
                                        kilogramo
                                    </SelectItem>
                                    <SelectItem onClick={() => setFormData({ ...formData, unidad_medida: "2" })}>
                                        gramo
                                    </SelectItem>
                                    <SelectItem onClick={() => setFormData({ ...formData, unidad_medida: "3" })}>
                                        litros
                                    </SelectItem>
                                    <SelectItem onClick={() => setFormData({ ...formData, unidad_medida: "4" })}>
                                        m3
                                    </SelectItem>
                                    <SelectItem onClick={() => setFormData({ ...formData, unidad_medida: "5" })}>
                                        m2
                                    </SelectItem>
                                </Select> */}


                                <Input

                                    label="Unidad medida"
                                    placeholder="Selecciona una unidad"
                                    name="unidad_medida"
                                    defaultItems={unidad_medida}
                                    value={formData.unidad_medida}
                                    onChange={handleChange}
                                />

                                {/* <Select
                                    label="Almacenamiento"
                                    placeholder="Selecciona un almacenamiento"
                                    name="fk_alm"
                                    defaultItems={fk_alm}
                                    value={formData.fk_alm || fk_alm}
                                    onChange={handleChange}
                                >
                                    {data2.map((item, index) => (
                                        <SelectItem key={item.id_almacenamiento} value={item.id_almacenamiento}>
                                            {item.nombre_alm}
                                        </SelectItem>
                                    ))}
                                </Select> */}


                                <Input
                                    label="Almacenamiento"
                                    placeholder="Selecciona un almacenamiento"
                                    name="fk_alm"
                                    defaultItems={fk_alm}
                                    value={formData.fk_alm || fk_alm}
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

export default ModalActualizarResiduos;
