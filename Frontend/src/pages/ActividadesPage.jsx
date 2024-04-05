import React, { useState, useEffect } from 'react';
import SidebarComponent from '../components/SidebarComponent';
import NavbarComponent from '../components/NavbarComponent';
import TableActividades from './actividades/TableActividades';
import axiosClient from '../axios-client';
import { Checkbox, Input } from '@nextui-org/react';
import { Select, SelectItem } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

function ActividadesPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [elementos, setElementos] = useState([]);
  const [tipoActividad, setTipoActividad] = useState('1');
  const [lugarActividad, setLugarActividad] = useState('1');
  const [fechaActividad, setFechaActividad] = useState('');
  const [cantidades, setCantidades] = useState({});

  const fetchData = async () => {
    try {
      const responseUsuarios = await axiosClient.get('http://localhost:3000/usuario/listar2');
      setUsuarios(responseUsuarios.data);
      const responseElementos = await axiosClient.get('http://localhost:3000/elemento/listar');
      setElementos(responseElementos.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCantidadChange = (elementoId, cantidad) => {
    setCantidades({ ...cantidades, [elementoId]: cantidad });
  };

  const handleActividad = async () => {
    try {
      const usuariosSeleccionados = usuarios.filter(usuario => usuario.isChecked)
        .map(usuario => usuario.id_usuario);

      const elementosSeleccionados = elementos.filter(elemento => elemento.isChecked)
        .map(elemento => ({ elemento_id: elemento.id_elemento, cantidad: cantidades[elemento.id_elemento] }));

      const datos = {
        tipo_actividad: tipoActividad,
        lugar_actividad: lugarActividad,
        fecha_actividad: fechaActividad,
        usuarios: usuariosSeleccionados,
        elementos: elementosSeleccionados
      };

      console.log(datos)

      const response = await axiosClient.post('http://localhost:3000/actividades/registrar', datos);
      console.log('Actividad registrada:', response.data);
      alert("activida registrada")
    } catch (error) {
      console.error('Error registering activity:', error);
    }
  };

  const handleUsuarioCheckboxChange = (id_usuario, isChecked) => {
    setUsuarios(usuarios.map(usuario => {
      if (usuario.id_usuario === id_usuario) {
        return { ...usuario, isChecked };
      }
      return usuario;
    }));
  };

  const handleElementoCheckboxChange = (id_elemento, isChecked) => {
    setElementos(elementos.map(elemento => {
      if (elemento.id_elemento === id_elemento) {
        return { ...elemento, isChecked };
      }
      return elemento;
    }));
  };

  return (
    <main className='flex bg-gray-100'>
      <SidebarComponent />
      <div className='flex flex-col w-full h-screen overflow-y-auto'>
        <NavbarComponent />
        <section className='px-6 py-5 pt-10'>
          <TableActividades />

          <div>
            <h2>Usuarios</h2>
            <form className='grid grid-cols-5 mb-10'>
              {usuarios.map(usuario => (
                <div key={usuario.id_usuario}>
                  <Checkbox
                    checked={usuario.isChecked}
                    onChange={(e) => handleUsuarioCheckboxChange(usuario.id_usuario, e.target.checked)}
                    color="success"
                    id={usuario.id_usuario}
                    name={usuario.id_usuario}
                    value={usuario.id_usuario}
                    className="mr-2"
                  />
                  <label htmlFor={usuario.id_usuario} className="mr-4">{usuario.nombre}</label>
                </div>
              ))}
            </form>
          </div>

          <div className='bg-white p-5'>
            <h2>Elementos</h2>
            <form className='flex justify-between my-5'>
              {elementos.map(elemento => (
                <div key={elemento.id_elemento} className="mb-2 w-full">
                  <Checkbox
                    checked={elemento.isChecked}
                    onChange={(e) => handleElementoCheckboxChange(elemento.id_elemento, e.target.checked)}
                    color="success"
                    id={`elemento-${elemento.id_elemento}`}
                    name={`elemento-${elemento.id_elemento}`}
                    value={elemento.id_elemento}
                    className="mr-2"
                  />
                  <label htmlFor={`elemento-${elemento.id_elemento}`} className="mr-4">
                    {elemento.nombre_elm} - {elemento.tipo_elm} {elemento.cantidad}
                  </label>
                  <Input
                  placeholder="cantidad"
                    className="max-w-xs"
                    type="number"
                    id={`cantidad-${elemento.id_elemento}`}
                    value={cantidades[elemento.id_elemento] || ''}
                    onChange={(e) => handleCantidadChange(elemento.id_elemento, e.target.value)}
                    min="0"

                  />
                </div>
              ))}
            </form>
          </div>

          <div className='w-full flex flex-col bg-white p-5'>
            <h2>Detalles de la Actividad</h2>
            <form className='flex justify-between w-full'>
              {/* <div>
                  <label htmlFor="tipoActividad">Tipo de Actividad:</label>
                  <input
                    type="text"
                    id="tipoActividad"
                    value={tipoActividad}
                  
                  />
                </div>

                




                <div>
                  <label htmlFor="lugarActividad">Lugar de la Actividad:</label>
                  <input
                    type="text"
                    id="lugarActividad"
                    value={lugarActividad}
                    onChange={e => setLugarActividad(e.target.value)}
                  />
                </div> */}

<div className='w-full'>
                <label htmlFor="tipoActividad">Tipo de Actividad:</label>
                <Input
                  type="text"
                  id="tipoActividad"
                  className="max-w-xs"
                  value={tipoActividad}
                // No hay necesidad de onChange aquí si 'tipoActividad' es solo de lectura
                />
              </div>

              <div className='w-full'>
                <label htmlFor="lugarActividad">Lugar de la Actividad:</label>
                <Input
                  type="text"
                  id="lugarActividad"
                  className="max-w-xs"
                  value={lugarActividad}
                  onChange={e => setLugarActividad(e.target.value)}
                  
                />
                
              </div>





              {/* <Select
  label="Tipo de Actividad"
  className="max-w-xs"
  value={tipoActividad}
  onChange={(e) => setTipoActividad(e.target.value)} // Utiliza e.target.value para obtener el valor seleccionado
>
  <SelectItem value="1">Recolección</SelectItem>
  <SelectItem value="2">Otras</SelectItem>
</Select>

<Select
  label="Lugar de la Actividad"
  className="max-w-xs"
  value={lugarActividad}
  onChange={(e) => setLugarActividad(e.target.value)} // Utiliza e.target.value para obtener el valor seleccionado
>
  <SelectItem value="1">Area 1</SelectItem>
  <SelectItem value="2">Area 2</SelectItem>
  <SelectItem value="3">Area 3</SelectItem>
  <SelectItem value="4">Area 4</SelectItem>
</Select> */}




              {/* <div>
                <label htmlFor="fechaActividad">Fecha de la Actividad:</label>
                <input
                  type="date"
                  id="fechaActividad"
                  value={fechaActividad}
                  onChange={e => setFechaActividad(e.target.value)}
                />
              </div> */}

              <div className='w-full'>
                <label htmlFor="fechaActividad">Fecha de la Actividad:</label>
                <Input
                  type="date"
                  id="fechaActividad"
                  className="max-w-xs"
                  value={fechaActividad}
                  onChange={e => setFechaActividad(e.target.value)}
                />
              </div>




            </form>
          </div>


          <Button className='my-5' onClick={handleActividad} color="primary">
            Registrar Actividad
          </Button>
        </section>
      </div>
    </main>
  );
}

export default ActividadesPage;
