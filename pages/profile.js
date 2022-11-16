import React from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'

const Profile = () => {
    const { data: session } = useSession()

    if (!session) {
        return (
            <Login />
        )
    }

    return (
        <div className='bg-black'>
            <Navbar />
            <div className='h-[100vh] bg-black flex flex-col justify-center'>
                <div className='w-[50vw] mx-auto text-white flex flex-col justify-center border border-gray-600 h-[50vh] p-5 rounded-xl'>
                    <h1 className='text-center mb-3 text-3xl'>Profile Details</h1>
                    <ul className='flex flex-col'>
                        <li className='my-2 p-2 flex'>
                            <span>Name:</span>
                            <span className='border border-gray-600 flex-1 p-2 ml-2'>{session?.user.name}</span>
                        </li>
                        <li className='my-2 p-2 flex'>
                            <span>Email:</span>
                            <span className='border border-gray-600 flex-1 p-2 ml-2'>{session?.user.email}</span>
                        </li>
                        <li className='my-2 p-2 flex'>
                            <span>Password:</span>
                            <span className='border border-gray-600 flex-1 p-2 ml-2'>{session?.user.email}</span>
                        </li>
                    </ul>
                    <Link href='/update' className='ml-auto hover:underline'>Update Account.</Link>
                </div>
            </div >
            <Footer />
        </div>
    )
}

export default Profile