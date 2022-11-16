import React from 'react'
import SignUp from './components/SignUp'
import { useSession } from 'next-auth/react'
import Login from './components/Login'

const Update = () => {
    const { data: session } = useSession()

    if (!session) {
        return (
            <Login />
        )
    }

    return (
        <SignUp update='Update' />
    )
}

export default Update