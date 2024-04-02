import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Button, Input, User, Chip, Tooltip, getKeyValue } from "@nextui-org/react";
import { SearchIcon } from './datatable_residuos/SearchIcon';
import { EditIcon } from "./icons/EditIcon";
import { DeleteIcon } from "./icons/DeleteIcon";
import { EyeIcon } from "./datatable_residuos/EyeIcon";
import axiosClient from '../axios-client';
import { PlusIcon } from './datatable_residuos/PlusIcon';
import ModalRegisterResiduo from './residuos/ModalRegisterResiduo';
import ModalActualizarResiduos from './residuos/ModalActualizarResiduos';
import ModalRegistrarSal2 from './mov_components/ModalRegistrarSal2';





function TablaResiduos() {
  const [data, setData] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState('');


  const fetchData = async () => {
    try {
      const response = await axiosClient.get('residuo/listar');
      setData(response.data);
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
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by name..."
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />

        <ModalRegisterResiduo fetchData={fetchData} />

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
          <TableColumn>NOMBRE</TableColumn>
          <TableColumn>RESIDUO</TableColumn>
          <TableColumn>TIPO</TableColumn>
          <TableColumn>CANTIDAD</TableColumn>
          <TableColumn>UNIDAD MEDIDA</TableColumn>
          <TableColumn>ALMACENAMIENTO</TableColumn>
          <TableColumn className='flex justify-center items-center'>ACCIONES</TableColumn>
        </TableHeader>
        <TableBody>
          {paginatedData.map(item => (
            <TableRow key={item.id_residuo}>
              <TableCell>{item.id_residuo}</TableCell>
              <TableCell>{item.nombre_residuo}</TableCell>
              <TableCell>{item.residuo}</TableCell>
              <TableCell>{item.tipo_residuo}</TableCell>
              <TableCell>{item.cantidad}</TableCell>
              <TableCell>{item.unidad_medida}</TableCell>
              <TableCell>{item.alm}</TableCell>
              <TableCell className='flex justify-center gap-2'>

                {/* <div className="relative flex items-center gap-2">
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

                <ModalActualizarResiduos residuos={item} fetchData={fetchData} />
                <ModalRegistrarSal2 residuos={item} fetchData={fetchData} />

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

export default TablaResiduos;
