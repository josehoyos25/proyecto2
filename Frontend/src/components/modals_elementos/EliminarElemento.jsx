import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, Input, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import axiosClient from '../../axios-client';
import { DeleteIcon } from '../icons/DeleteIcon';
import ModalAlert from '../configs/ModalAlert';

function EliminarElemento({ fetchData, elemento }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [showAlert, setShowAlert] = useState(false);
    const [showAlert2, setShowAlert2] = useState(false);


    const handleSubmit = async () => {
        try {
      
        
            await axiosClient.delete(`http://localhost:3000/elemento/eliminar/${elemento.id_elemento}`).then(() => {
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
              
        <DeleteIcon/>
            </Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Eliminbar Elemento</ModalHeader>
                            <ModalBody>
                               <h2>Estas Seguro de Eliminar el Elemento</h2>
                             
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>Cerrar</Button>
                                <Button color="primary" onClick={handleSubmit} onPress={onClose}>Eliminar</Button>
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



export default EliminarElemento