import Link from "next/link"

function Footer() {
  return (
    <footer className="my-16 py-6 mx-auto flex flex-col md:flex-row justify-center items-center">
        <p>
            Copyright &copy; DJ Events 2023 
        </p>
        <Link className="md:ml-5 underline transition duration-700 hover:underline-offset-2 hover:text-slate-500" href='/about'>About this Project</Link>
    </footer>
  )
}

export default Footer