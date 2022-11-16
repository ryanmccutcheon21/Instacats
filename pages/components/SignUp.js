import React, { useState } from 'react'
import Navbar from './Navbar'

const SignUp = ({ register, update }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [first, setFirst] = useState('')
    const [last, setLast] = useState('')
    const [newUser, setNewUser] = useState({
        email: '',
        password: '',
        full_name: '',
        short_name: '',
        registered_at: new Date()
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        setNewUser({
            email,
            password,
            full_name: `${first} ${last}`,
            short_name: `${last} ${first.slice(0, 1)}.`,
            registered_at: Date.now()
        })

        const res = await fetch(`/api/users`, {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: { "Content-Type": "application/json" }
        })
        const data = await res.json()
        console.log(data)
        setEmail('')
        setPassword('')
        setFirst('')
        setLast('')
    }

    return (
        <div className='bg-black'>
            <Navbar />
            <div className='bg-black h-[100vh] flex flex-col justify-center text-white'>
                <main className='border border-gray-500 w-[50vw] mx-auto p-5 rounded-xl'>
                    <h1 className='text-center text-3xl mb-5'>{register ? register : `${update} Account`}</h1>
                    <form className='flex flex-col'>
                        <label>First: </label>
                        <input
                            className='my-3 bg-black border border-gray-500 rounded p-2'
                            type='text'
                            onChange={(e) => setFirst(e.target.value)}
                            value={first} />
                        <label>Last: </label>
                        <input
                            className='my-3 bg-black border border-gray-500 rounded p-2'
                            type='text'
                            onChange={(e) => setLast(e.target.value)}
                            value={last} />
                        <label>Email: </label>
                        <input
                            className='my-3 bg-black border border-gray-500 rounded p-2'
                            type='email'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email} />
                        <label>Password: </label>
                        <input
                            className='my-3 bg-black border border-gray-500 rounded p-2'
                            type='password'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password} />
                        <button className='bg-red-900 hover:bg-red-800 w-[50%] mx-auto rounded py-2' type='button' onClick={handleSubmit}>{register ? register : update}</button>
                    </form>
                </main>
            </div>
        </div>
    )
}

export default SignUp