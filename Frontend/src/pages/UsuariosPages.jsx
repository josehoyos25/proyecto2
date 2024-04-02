import React from 'react'
import SidebarComponent from '../components/SidebarComponent'
import NavbarComponent from '../components/NavbarComponent'
import TableUsuarios from './usuarios/TableUsuarios'

function UsuariosPages() {
  return (
    < main className='flex bg-gray-100'>
      <SidebarComponent />
      <div className='flex flex-col w-full h-screen overflow-y-auto'>
        <NavbarComponent />
        <section className='px-6 py-5 pt-10'>
          {/* <DatatableResiduos/> */}
         
<TableUsuarios/>
          
        </section>
      </div>


    </main>
  )
}


export default UsuariosPages