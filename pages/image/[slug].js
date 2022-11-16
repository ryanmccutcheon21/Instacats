import React, { useState } from 'react'
import Image from 'next/image'
import { mediaUrl, fetchData } from '../../utils/fetchData'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import Navbar from '../components/Navbar'

export const getStaticPaths = async () => {
    // get posts
    const res = await fetchData(`${mediaUrl}/api/posts/`)
    // for every post, get the image string and set it to slug
    const paths = res.map(post => {
        return {
            params: { slug: post.image }
        }
    })
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    // get image string from getStaticPaths params
    const image = context.params.slug
    // get url for each image
    const url = `${mediaUrl}/media/${image}`
    return {
        props: { url, image }
    }
}


const ImagePage = ({ url, image }) => {

    const [showComment, setShowComment] = useState(false)
    const [showComments, setShowComments] = useState(false)
    const [commentArr, setCommentArr] = useState([])
    const [newComment, setNewComment] = useState({
        pk: Number,
        name: '',
        text: '',
        entry: Number,
        timestamp_updated: new Date(),
        timestamp_created: new Date()
    })

    const handleChange = e => {
        setNewComment({
            text: e.target.value
        })
    }

    const fetchComments = async () => {
        const res = await fetchData(`${mediaUrl}/api/posts/`)

        // return the object that contains the image
        const currentObj = await res.filter(obj => obj.image === image)
        // set the commentArr equal to the array in the image's comments array
        setCommentArr([currentObj[0].comments])
        // display the new comment above the input text field
        setShowComment(true)
        // return commentArr
    }

    const handleSubmit = async () => {
        // post new comment object to API
        const res = await fetchData(`${mediaUrl}/api/posts/`, {
            method: 'POST',
            body: JSON.stringify({ newComment }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        // return the object that contains the image
        const currentObj = await res.filter(obj => obj.image === image)
        // add the new comment to the comments array in the image's object
        currentObj[0].comments.unshift(newComment)
        // set the commentArr equal to the array in the image's comments array
        setCommentArr([currentObj[0].comments])
        // display the new comment above the input text field
        setShowComment(true)
        // return commentArr
    }

    return (
        <div className='bg-black pb-10'>
            <Navbar />
            <div className='mt-5 w-[50vw] mx-auto border-2 p-3 rounded-xl'>
                <div className='relative h-[50vh] mx-auto mb-4'>
                    <Image
                        src={url}
                        layout='fill'
                        alt='Cat Image'
                    />
                </div>
                {showComment && (<p className='text-white ml-3'>{newComment.text}</p>)}
                <form className='mt-5 flex justify-center'>
                    <input value={newComment.text} onChange={handleChange} placeholder='Type in a comment' type='text' id='comment' name='comment' className='pl-2 w-[75%] py-2 border border-b-2 border-r-2 border-l-2 border-t-2 border-black' />
                    <button type='button' onClick={handleSubmit} className='bg-red-900 text-white px-2 md:w-[20%] rounded ml-1 py-2 hover:bg-red-800'>Comment</button>
                </form>
                <div className='w-[100%] flex flex-col mt-5'>
                    {/* show if user does not want to see comments */}
                    {!showComments && (
                        <>
                            <p className='mx-auto text-white'>View More Comments</p>
                            <div className='rounded-3xl mt-5 w-12 h-12 mx-auto flex  justify-center bg-red-900 mb-3 hover:bg-red-800 hover:cursor-pointer' onClick={async () => {
                                // handleSubmit()
                                await fetchComments()
                                setShowComments(true)
                            }}>
                                <IoIosArrowDown className='my-auto mx-auto' />
                            </div>
                        </>
                    )}
                    {/* show comments */}
                    {showComments && (
                        <div className='text-white flex flex-col'>
                            <p className='mx-auto'>Hide Comments</p>
                            <div className='rounded-3xl mt-5 w-12 h-12 mx-auto flex  justify-center bg-red-900 mb-3 hover:bg-red-800 hover:cursor-pointer' onClick={() => {
                                setShowComments(false)
                            }}>
                                <IoIosArrowUp className='my-auto mx-auto' />
                            </div>
                            <ul className='overflow-clip'>
                                {commentArr[0].map(comment => (
                                    <li key={comment.text}>{comment.text}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ImagePage