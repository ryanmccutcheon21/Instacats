import React, { useState } from 'react'
import Link from 'next/link'
import Image from "next/image"
import { useSession, signIn, signOut } from "next-auth/react"
import { Uploader } from 'uploader'
import { UploadButton } from 'react-uploader'

const Navbar = () => {
    const { data: session } = useSession()
    const [showDropdown, setShowDropdown] = useState(false)
    const [newImage, setNewImage] = useState({
        pk: '',
        name: '',
        comments: [],
        image: '',
        timestamp_created: new Date(),
        timestamp_updated: new Date(),
    })

    const post = async () => {

        const res = await fetch(`/api/posts`, {
            method: 'POST',
            body: JSON.stringify(newImage),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        console.log(data)
    }


    const uploader = Uploader({
        apiKey: "public_W142hX38owznRzUbKXnKgnCaHy5M"
    })

    return (
        <nav>
            <div className='mx-5 flex justify-between'>
                <Link Link href='/' className='rounded px-2 py-1 text-white border border-red-900 hover:bg-red-900 hover:transition-all text-center mt-5' > Instacats</Link>
                <div className='text-white flex flex-col w-[10rem]'>
                    {session && (
                        <div className="flex flex-col">
                            <Image
                                src={session.user.image}
                                width={40}
                                height={40}
                                alt='Profile Icon'
                                className="object-contain rounded-3xl mt-5 mx-auto hover:cursor-pointer"
                                onMouseEnter={() => setShowDropdown(!showDropdown)}
                            />
                            {/* Dropdown with sign out for signed in user */}
                            {showDropdown &&
                                (
                                    <ul onMouseLeave={() => setShowDropdown(false)} className="text-black p-2 flex flex-col justify-center absolute top-20 right-10 bg-gray-400 max-w-sm">
                                        <li className="border-solid border-b-2 border-black">Signed in as <br /> {session.user.name}</li>
                                        <li className="hover:cursor-pointer hover:text-white"> <UploadButton
                                            uploader={uploader}
                                            options={{ multi: true }}
                                            onComplete={files => {
                                                setNewImage({
                                                    pk: 1,
                                                    name: session?.user.name,
                                                    image: files[0]?.fileUrl,
                                                    comments: [],
                                                    timestamp_created: Date.now(),
                                                    timestamp_updated: Date.now()
                                                })
                                                post()
                                            }}
                                        >
                                            {({ onClick }) =>
                                                <button onClick={onClick}>
                                                    Upload Image
                                                </button>
                                            }
                                        </UploadButton></li>
                                        <Link href='/profile'>
                                            <li className="hover:cursor-pointer hover:text-white">Your Profile</li>
                                        </Link>
                                        <Link href='/update'>
                                            <li className="hover:cursor-pointer hover:text-white">Update Account</li>
                                        </Link>
                                        <li className="hover:cursor-pointer hover:text-white">
                                            <Link href='/api/auth/signout'>
                                                <button onClick={() => signOut()}>Sign out</button>
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                        </div>
                    )}
                    {/* Sign In if user not signed in */}
                    {!session && (
                        <div className="mt-5 hover:text-gray-200 text-white">
                            <button onClick={() => signIn()}>Sign In</button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar