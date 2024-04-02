import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Button, Input, User, Chip, Tooltip, getKeyValue } from "@nextui-org/react";



import { PlusIcon } from '../datatable_residuos/PlusIcon';
import { SearchIcon } from '../datatable_residuos/SearchIcon';
import axiosClient from '../../axios-client';
import ModalRegistrarMov from './ModalRegistrarMov';
import ModalRegistrarSal from './ModalRegistrarSal';




function TableMovimientos() {
    const [data, setData] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState(new Set([]));
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(1);
    const [filterValue, setFilterValue] = useState('');


    const fetchData = async () => {
        try {
            const response = await axiosClient.get('residuo/listar_mov');
            setData(response.data);
            console.log("mov", response.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const onSearchChange = (value) => {
        setFilterValue(value);
        setPage(1); // Reset page number when changing search filter
    };

    const onClear = () => {
        setFilterValue('');
        setPage(1); // Reset page number when clearing search filter
    };

    const onPageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    const onRowsPerPageChange = (e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1); // Reset page number when changing rows per page
    };

    const onPreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const onNextPage = () => {
        const totalPages = Math.ceil(data.length / rowsPerPage);
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedData = data.filter(item => item.nombre_residuo.toLowerCase().includes(filterValue.toLowerCase())).slice(start, end);


    const statusColorMap = {
        active: "success",
        paused: "danger",
        vacation: "warning",
    };


    return (
        <>
            <div className='flex justify-between items-center w-full'>
                <Input
                color="default"
                    isClearable
                    className="w-full sm:max-w-[44%]"
                    placeholder="Search by name..."
                    startContent={<SearchIcon />}
                    value={filterValue}
                    onClear={() => onClear()}
                    onValueChange={onSearchChange}
                />


                <div className='flex justify-center items-center gap-x-4'>
                    <ModalRegistrarMov fetchData={fetchData} />
                    <ModalRegistrarSal fetchData={fetchData} />
                </div>

            </div>


            <div className="flex justify-between items-center my-5">
                <span className="text-default-400 text-small">Total {data.length} residuos</span>
                <label className="flex items-center text-default-400 text-small">
                    Rows per page:
                    <select
                        className="bg-transparent outline-none text-default-400 text-small"
                        value={rowsPerPage}
                        onChange={onRowsPerPageChange}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </label>
            </div>

            <Table aria-label="Example static collection table" selectedKeys={selectedKeys} selectionMode="multiple" onSelectionChange={setSelectedKeys}>
                <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>TIPO MOVIMIENTO</TableColumn>
                    <TableColumn>CANTIDAD</TableColumn>
                    <TableColumn>FECHA</TableColumn>
                    <TableColumn>ENCARGADO</TableColumn>
                    <TableColumn>RESIDUO</TableColumn>
                    <TableColumn>ACTIVIDAD</TableColumn>
                    <TableColumn>DESTINO</TableColumn>
                </TableHeader>
                <TableBody>
                    {paginatedData.map(item => (
                        <TableRow key={item.id_movimiento}>
                            <TableCell>{item.id_movimiento}</TableCell>
                            <TableCell>{item.tipo_movimiento}</TableCell>
                            <TableCell>{item.cantidad_total}</TableCell>
                            <TableCell>{item.fecha}</TableCell>
                            <TableCell>{item.user}</TableCell>
                            <TableCell>{item.residuo}</TableCell>
                            <TableCell>{item.actividad}</TableCell>

                            <TableCell>
                                {/* 
                                <div className="relative flex items-center gap-2">
                                    <Tooltip content="Details">
                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                            <EyeIcon />
                                        </span>
                                    </Tooltip>
                                    <Tooltip content="Edit user">
                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                            <EditIcon />
                                        </span>
                                    </Tooltip>
                                    <Tooltip color="danger" content="Delete user">
                                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                            <DeleteIcon />
                                        </span>
                                    </Tooltip>
                                </div> */}


                                {item.empresa}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="py-2 px-2 flex justify-between my-2 items-center">
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={Math.ceil(data.length / rowsPerPage)}
                    onChange={onPageChange}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button isDisabled={page === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                        Previous
                    </Button>
                    <Button isDisabled={page === Math.ceil(data.length / rowsPerPage)} size="sm" variant="flat" onPress={onNextPage}>
                        Next
                    </Button>
                </div>
            </div>
        </>
    );
}



export default TableMovimientos
