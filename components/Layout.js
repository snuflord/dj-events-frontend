import Head from "next/head"
import Header from "./Header"
import Footer from "./Footer"

function Layout({title, keywords, description, children}) {
  return (
    <>
        <Head>
            <title>{title}</title>
            <meta name='description' content={description}></meta>
        </Head>

        <Header />
        <main className="px-4 text-black">
            <div className='h-auto flex justify-left items-center bg-white/50 mx-auto w-3/4 rounded-lg mb-16 p-16 my-5'>
                <div className='text-2xl font-medium'>{children}</div>
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