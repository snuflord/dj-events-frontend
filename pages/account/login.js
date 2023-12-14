import { FaUser } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useContext } from 'react'
import Link from 'next/link';
import Layout from '@/components/Layout';
import AuthContext from '@/context/AuthContext';

// THIS IS THE LOGIN PAGE, NOT THE LOGIN API REQUEST

export default function LoginPage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // login function and error state from AuthContext
    const {login, error} =  useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault()

        // see AuthContext for login function - form data passed in. 
        login({email, password})
        
    }

    useEffect(() => {
        if (error) {
        //   console.log("error", error.message.errors[0].message);
          toast.error('Invalid Credentials: please check your details.');
        }
    }, [error]);

  return (
    <Layout title={'User Login'}>
        <div className='w-full md:w-1/2 m-auto p-1 md:p-6 shadow-xl flex flex-col items-center'>
            <h1 className='flex items-center text-2xl'>
                <FaUser /> Log In
            </h1>

            <ToastContainer />

            <form className='w-full px-2' onSubmit={handleSubmit}> 
                <div className='flex flex-col my-2'>
                    <label className='font-bold mb-2' htmlFor='email'>Email</label>
                    <input className='bg-white h-4 p-4 rounded w-full' type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className='flex flex-col my-2'>
                    <label className='font-bold mb-2' htmlFor='password'>Password</label>
                    <input className='bg-white h-4 p-4 rounded w-full' type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <button type='submit' value='Login' className='btn my-4 w-full'>Login</button>
            </form>

            <p className='my-2'>Don't have an account? <Link className='underline' href='/account/register'>Register</Link></p>
        </div>
    </Layout>
  )
}
