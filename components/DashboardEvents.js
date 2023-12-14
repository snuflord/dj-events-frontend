
import Link from "next/link"
import { FaPencilAlt, FaTimes } from "react-icons/fa"

function DashboardEvents({evt, handleDelete}) {
    return (

        <div className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 rounded-lg mb-2 group transition-all duration-200 hover:text-white hover:bg-gradient-to-r hover:from-indigo-300 hover:via-purple-300 hover:to-pink-400">
            <h4 className="w-full flex justify-between">
                <Link className="font-bold block p-4 flex-auto transition-all duration-500" href={`/events/${evt.attributes.slug}`}>
                    {evt.attributes.name}
                </Link>
                <div className="flex">
                    <Link className="flex items-center mr-2 pr-2 text-white hover:text-emerald-300" href={`/events/edit/${evt.id}`}>
                        <FaPencilAlt className="mr-2"/><span>Edit Event</span>
                    </Link>
                    <a href='#' onClick={() => handleDelete(evt.id)} className="flex items-center mr-2 pr-2 text-white hover:text-black">
                        <FaTimes className="mr-2"/><span>Delete</span>
                    </a>
                </div>
                
            </h4>
        </div>
    
      )
}

export default DashboardEvents

