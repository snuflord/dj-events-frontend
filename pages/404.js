import Layout from "@/components/Layout"
import Link from "next/link"
import { FaExclamationTriangle, FaSadCry } from 'react-icons/fa'

function NotFoundPage() {
  return (
    <Layout title='Page not found!'>
        <div className="text-center">
            <h1 className="font-bold text-5xl mx-5 my-6 relative">
                <div className="text-center flex justify-center mb-4"><FaExclamationTriangle/></div>404 - Not Found!</h1>
                <div className="flex justify-center align-center text-lg">
                  <h4 className="mb-6">Sorry there is nothing here </h4>
                  <div className="text-2xl ml-2"><FaSadCry/></div>
                </div>
            
            <Link className="btn" href='/'>Back Home</Link>
        </div>
    </Layout>
  )
}

export default NotFoundPage