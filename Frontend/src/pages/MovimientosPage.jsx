import React from 'react'
import SidebarComponent from '../components/SidebarComponent'
import NavbarComponent from '../components/NavbarComponent'
import TableMovimientos from '../components/mov_components/TableMovimientos'


function MovimientosPage() {
  return (
    < main className='flex bg-gray-100'>
      <SidebarComponent />
      <div className='flex flex-col w-full h-screen overflow-y-auto'>
        <NavbarComponent />
        <section className='px-6 py-5 pt-10'>
 
          {/* <DatatableResiduos/> */}
         <TableMovimientos/>
        </section>

      </div>


    </main>
  )
}

export default MovimientosPage
