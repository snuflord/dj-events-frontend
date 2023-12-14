
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Search() {

    const [term, setTerm] = useState('')
    const router = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push(`/events/search?term=${term}`)
        setTerm('')
    }

  return (
    <div className='w-auto md:w-[250px] h-[35px] p-3 border-slate-600 border-2 rounded flex flex-row items-center justify-center'>
        <form onSubmit={handleSubmit}>
            <input className='bg-white outline-none' type='text' value={term} onChange={(e) => setTerm(e.target.value)} placeholder='Search Events'/>
        </form>
        <button className='hover:text-blue-400' onClick={handleSubmit} type="submit" value="Search">Search</button>
    </div>
  )
}
