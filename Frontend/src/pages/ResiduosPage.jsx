import React from 'react'
import SidebarComponent from '../components/SidebarComponent'
import NavbarComponent from '../components/NavbarComponent'
import DatatableResiduos from '../components/DatatableResiduos'
import TablaResiduos from '../components/TablaResiduos'

function ResiduosPage() {
  return (
    < main className='flex bg-gray-100'>
      <SidebarComponent />
      <div className='flex flex-col w-full h-screen overflow-y-auto'>
        <NavbarComponent />
        <section className='px-6 py-5 pt-10'>
          {/* <DatatableResiduos/> */}
          <TablaResiduos/>

          
        </section>
      </div>


    </main>
  )
}

export default ResiduosPage
