import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faTrash, faWarehouse, faFile, faClipboard, faUser, faAlignCenter, faPowerOff, faC, faEllipsisVertical, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom"
import ModalLogout from './configs/ModalLogout';


function SidebarComponent() {

  const [toggle, setToggle] = useState(false)

  const clickSidebar = () => {
    setToggle(!toggle)
  }

  return (
    // <div className='w-full h-full' >
    <>
      <div className={`h-screen bg-[#38A800] px-4 duration-700 ease-in-out py-5 relative ${toggle ? 'w-[65px]' : 'w-[300px]'}`}>
        <span onClick={clickSidebar} className='absolute cursor-pointer -right-2 top-3.5 text-xl rounded-full'>
        <FontAwesomeIcon className='bg-[#38A800] rounded-full text-white text-2xl transform hover:-scale-100 duration-700' icon={faAngleRight} />
        </span>
        <div className='w-full overflow-hidden h-full flex flex-col justify-start flex-nowrap'>



          <div className='flex overflow-hidden w-[210px] items-center justify-center gap-x-4 py-2 -translate-y-3 text-white'>
            <span className='text-white font-black text-2xl'>
              {<FontAwesomeIcon icon={faWarehouse} />} 
            </span>
            <h2 className='text-xl font-bold text-white'>
              Centro de Acopio
            </h2>
          </div>

          <ul className='border-t overflow-hidden border-b 2xl:mt-8 border-white border-opacity-50 py-5 border-b-white'>
            <li className='flex justify-start pl-1.5 items-center gap-x-4  text-white text-opacity-80 2xl:text-lg'>
              <FontAwesomeIcon icon={faHouse} />Dashboard</li>
          </ul>

          <ul className='border-b  border-b-white relative mt-20 2xl:mt-28 border-opacity-50 text-white text-opacity-80'>

            <span className='text-xl font-bold p-[8px]  ml-2 cursor-pointer h-10 2xl:h-11 flex items-center justify-start gap-x-4 2xl:text-lg'>
            <FontAwesomeIcon className='mr-3' icon={faEllipsisVertical} />
              Menu
            </span>
            <Link to="/residuos">

              <li className='hover:bg-white/80 hover:text-[#38A800] p-[8px] cursor-pointer h-10 2xl:h-11 flex items-center justify-start gap-x-4 2xl:text-lg transition ease-in-out duration-300 rounded-lg'><FontAwesomeIcon className='transition ease-in-out hover:-text-white hover:-translate-y-1 hover:scale-50 duration-300' icon={faTrash} />Residuos</li>
            </Link>
            <Link to="/movimientos">
              <li className='hover:bg-white/80 hover:text-[#38A800] p-[8px] cursor-pointer h-10 2xl:h-11 flex items-center justify-start gap-x-4 2xl:text-lg transition ease-in-out duration-300 rounded-lg'><FontAwesomeIcon className='transition ease-in-out hover:-text-white hover:-translate-y-1 hover:scale-50 duration-300' icon={faFile} />Movimientos</li>
            </Link>

            <Link to="/actividades">
              <li className='hover:bg-white/80 hover:text-[#38A800] p-[8px] cursor-pointer h-10 2xl:h-11 flex items-center justify-start gap-x-4 2xl:text-lg transition ease-in-out duration-300 rounded-lg'><FontAwesomeIcon className='transition ease-in-out hover:-text-white hover:-translate-y-1 hover:scale-50 duration-300' icon={faClipboard} />Actividades</li> 
            </Link>

            <Link to="/usuarios">
              <li className='hover:bg-white/80 hover:text-[#38A800] p-[8px] cursor-pointer h-10 2xl:h-11 flex items-center justify-start gap-x-4 2xl:text-lg transition ease-in-out duration-300 rounded-lg'><FontAwesomeIcon className='transition ease-in-out hover:-text-white hover:-translate-y-1 hover:scale-50 duration-300' icon={faUser} />Usuarios</li>
            </Link>

            <Link to="/elementos">
              <li className='hover:bg-white/80 hover:text-[#38A800] p-[8px] cursor-pointer h-10 2xl:h-11 flex items-center justify-start gap-x-4 2xl:text-lg transition ease-in-out duration-300 rounded-lg'><FontAwesomeIcon className='transition ease-in-out hover:-text-white hover:-translate-y-1 hover:scale-50 duration-300' icon={faAlignCenter} />Elementos</li>
            </Link>

            {/* <li className='hover:bg-white/80 hover:text-[#38A800] p-2 cursor-pointer h-10 2xl:h-11 flex items-center justify-start gap-x-4 2xl:text-lg'><FontAwesomeIcon icon={faTrash} />Residuos</li> */}

          </ul>

          <ul className='border-t overflow-hidden border-white mt-28 2xl:mt-36 py-5 border-opacity-50'>
            <li className='flex justify-start pl-1.5 items-center gap-x-4 text-white text-opacity-80 2xl:text-lg'><ModalLogout /></li>
          </ul>

        </div>
      </div>
    </>
    // </div>
  )
}

export default SidebarComponent
