import React from 'react'
import LoginComponent from '../components/LoginComponent'

function LoginPage() {
  return (
    <>
      <main className='w-full h-screen bg-red-400 relative'>
        <LoginComponent />
        <div className='w-full h-[50%] bg-gray-200 2xl:p-48 p-20 py-20 2xl:py-36'>
          <div className='w-[40%] flex flex-col gap-y-10'>
            <h1 className='text-4xl 2xl:text-7xl font-black'>
              Bienvenido al <br />
              <span className='text-5xl 2xl:text-8xl'>
                Centro de Acopio
              </span>
            </h1>

            <p className='text-lg 2xl:text-xl w-[90%] 2xl:w-[80%] text-gray-600'>
              Transformemos basura en oportunidades, cada recogida es un paso hacia
              un futuro más <span className='text-[#38A800] font-bold'> limpio y sostenible. 
              ¡Juntos, construimos un
              mundo mejor, un reciclaje a la vez!
              </span>
            </p>
          </div>
        </div>
        <div className='w-full h-[50%] bg-white px-48 py-20'>
          <div className='w-[50%] flex flex-col gap-y-10'>
            <img className='w-[60%]' src="undraw_explore_re_8l4v.svg" alt="" />
          </div>
        </div>
      </main>
    </>
  )
}

export default LoginPage