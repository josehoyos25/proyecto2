import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Button, Input, User, Chip, Tooltip, getKeyValue } from "@nextui-org/react";
import { Switch } from "@nextui-org/react";



import { SearchIcon } from '../../components/datatable_residuos/SearchIcon';
import axiosClient from '../../axios-client';
import RegistrarUsuario from '../../components/modals_usuarios/RegistrarUsuario';
import ActualizarUsuarios from '../../components/modals_usuarios/ActualizarUsuarios';
import ActualizarActividad from '../../components/actividades/ActualizarActividad';





function TableActividades() {
  const [data, setData] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState('');


  const fetchData = async () => {
    try {
      const response = await axiosClient.get('actividades/listar');
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
  const paginatedData = data.filter(item => item.nombre_act.toLowerCase().includes(filterValue.toLowerCase())).slice(start, end);


  const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
  };

  const cambiarEstado = async (id) => {

    await axiosClient.put(`http://localhost:3000/actividades/actualizar/${id}`).then((response) => {

      console.log("actividades",response.data)
      fetchData()
    })
  }


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

        {/* <RegistrarUsuario fetchData={fetchData} /> */}

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
          <TableColumn>TIPO</TableColumn>
          <TableColumn>NOMBRE</TableColumn>
          <TableColumn>LUGAR</TableColumn>
          <TableColumn>FECHA</TableColumn>
          <TableColumn>ESTADO</TableColumn>
          <TableColumn className='flex justify-center items-center'>ACCIONES</TableColumn>
        </TableHeader>
        <TableBody>
          {paginatedData.map(item => (
            <TableRow key={item.id_actividad}>
                           <TableCell>{item.id_actividad}</TableCell>
              <TableCell>{item.tipo_actividad}</TableCell>
              <TableCell>{item.nombre_act}</TableCell>

              <TableCell>{item.nombre_lugar}</TableCell>
              <TableCell>{item.fecha_actividad}</TableCell>


              <TableCell><div className='w-20 inline-block'>
              {item.estado_actividad}
              </div>
                <Switch
                  defaultSelected={item.estado_actividad === 'asignada'}
                  color="success"
                  onChange={() => cambiarEstado(item.id_actividad)}
                />
              </TableCell>
              <TableCell className='flex justify-center gap-2'>

             <ActualizarActividad actividad={item} fetchData={fetchData}/>
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





export default TableActividades