import { FaUser } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useContext } from 'react'
import Link from 'next/link';
import Layout from '@/components/Layout';
import AuthContext from '@/context/AuthContext';

export default function RegisterPage() {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    // login function and error state from AuthContext, which is wrapping app.js
    const {register, error} =  useContext(AuthContext)

    useEffect(() => {
        if (error) {
          console.log("error", error.message.errors[0].message);
          toast.error( error.message.errors[0].message);
        }
    }, [error]);

    const handleSubmit =(e)=> {
        e.preventDefault()

        if(password !== passwordConfirm) {
            toast.error('Passwords do not match!')
        }

        if(password === passwordConfirm) {
            register({username, email, password})
        }
    }

  return (
    <Layout title={'User Registration'}>
        <div className='w-full md:w-1/2 m-auto p-1 md:p-6 shadow-xl flex flex-col items-center'>
            <h1 className='flex items-center text-2xl'>
                <FaUser /> Sign Up
            </h1>

            <ToastContainer />

            <form className='w-full px-2' onSubmit={handleSubmit}> 

                <div className='flex flex-col my-2'>
                    <label className='font-bold mb-2' htmlFor='username'>Username</label>
                    <input className='bg-white h-4 p-4 rounded w-full' type='text' id='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>

                <div className='flex flex-col my-2'>
                    <label className='font-bold mb-2' htmlFor='email'>Email</label>
                    <input className='bg-white h-4 p-4 rounded w-full' type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className='flex flex-col my-2'>
                    <label className='font-bold mb-2' htmlFor='password'>Password</label>
                    <input className='bg-white h-4 p-4 rounded w-full' type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <div className='flex flex-col my-2'>
                    <label className='font-bold mb-2' htmlFor='password'>Password Confirm</label>
                    <input className='bg-white h-4 p-4 rounded w-full' type='password' id='passwordConfirm' value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}/>
                </div>

                <button type='submit' value='Login' className='btn my-4 w-full'>Sign Up</button>
            </form>

            <p className='my-2'>Already have an account? <Link className='underline' href='/account/login'>Log in</Link></p>
        </div>
    </Layout>
  )
}
