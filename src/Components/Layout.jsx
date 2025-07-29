import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { Toaster } from 'react-hot-toast'


const Layout = () => {
    return (
        <div className='sm:w-2/3 md:w-1/2 lg:w-1/3 h-screen bg-white mx-auto'>

            <Navbar/>
            <Toaster position='bottom-center'/>
            <main className='w-full h-[calc(100vh-88px)] overflow-hidden overflow-y-auto'>
                <Outlet/>
            </main>

            <Footer/>
            
        </div>
    )
}

export default Layout