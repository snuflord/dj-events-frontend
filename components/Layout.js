import Head from "next/head"
import Header from "./Header"
import Footer from "./Footer"
import Showcase from "./Showcase"
import { useRouter } from "next/router"

function Layout({title, keywords, description, children}) {

    // we are using router to check for the home path (/) and displaying the showcase component if so.
    const router = useRouter()

  return (
    <>
        <Head>
            <title>{title}</title>
            <meta name='description' content={description}></meta>
        </Head>

        <Header />

        {router.pathname === '/' && <Showcase />}
        

        <main className="px-4 text-black">
            <div className='h-auto bg-white/50 mx-auto w-full md:w-3/4 rounded-lg mb-16 p-4 md:p-16 my-5'>
                <div className='text-1xl font-medium'>{children}</div>
            </div>
        </main>

        <Footer/>
    </>
    
  )
}

Layout.defaultProps = {
    title: 'DJ Events | Find the hottest parties',
    description: 'Find the latest DJ and other musical events',
    keywords: 'music, dj, EDM, events'
}

export default Layout