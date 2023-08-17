import Link from "next/link"

function Header() {
  return (
    <header className="flex flex-col h-auto md:flex-row md:h-16 justify-between items-center bg-white text-black px-3 shadow-md">
        <div className="mx-[20px] md:mx-5 text-red-400 text-lg uppercase">
            <Link className="text-red-400 hover:text-red-800 font-bold" href='/'>
                DJ Events
            </Link>
        </div>

        <nav>
            <ul>
                <li className="py-2 md:py-0">
                    <Link className="text-lg text-slate-700 hover:text-red-800" href="/events">Events</Link>
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default Header