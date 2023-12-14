import Link from "next/link"
import Search from "./Search"
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import AuthContext from "@/context/AuthContext"

// use context allows us to use AuthContext specific context.
import { useContext } from "react"

function Header() {

    // extracting values from AuthContext via useContext prop
    const {user, logout} = useContext(AuthContext)

  return (
    <header className=" bg-white text-black px-3 shadow-md flex justify-center">
        <div className="container my-4 flex flex-col h-auto md:flex-row md:h-16 justify-between items-center">
            <div className="mx-[20px] md:mx-5 text-emerald-500 text-lg uppercase ">
                <Link className="mb-2 block md:mb-0text-red-400 hover:text-emerald-500 font-bold" href='/'>
                    DJ Events
                </Link>
            </div>

            <Search />

            <nav>
                <ul className="flex gap-x-3 items-center">
                    <li className="py-2 md:py-0">
                        <Link className="text-lg font-bold text-slate-700 hover:text-emerald-500" href="/events">Events</Link>
                    </li>

                    {user ? 
                        // if logged in - we can see 'add event'
                        <>
                        <li>
                            <Link className="text-lg font-bold text-slate-700 hover:text-emerald-500" href="/events/add">Add Event</Link>
                        </li>
                        <li>
                            <Link className="text-lg font-bold text-slate-700 hover:text-emerald-500" href="/account/dashboard">Dashboard</Link>
                        </li>
                        <li className="mt-2 md:mt-0 flex items-center space-x-2 group btn btn-black">
                            <FaSignOutAlt className="text-white group-hover:text-emerald-500 transition-all duration-300"/>
                            <Link onClick={() => logout()} className="text-lg font-bold capitalize transition-all duration-300 text-white" href="/">Logout</Link>
                        </li>
                        </>
                    
                        : 
                        // if not logged in
                    <li className="mt-2 md:mt-0 flex items-center space-x-2 group btn btn-black">
                        <FaSignInAlt className="text-white group-hover:text-emerald-500 transition-all duration-300"/>
                        <Link className="text-lg font-bold capitalize transition-all duration-300 text-white" href="/account/login">Login</Link>
                    </li>
                    }
                </ul>
            </nav>
        </div>
    </header>
  )
}

export default Header