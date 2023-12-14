import showcaseImg from '../styles/images/showcase.jpg'
import Image from 'next/image'

function Showcase() {
  return (
    <>
        <div className="text-white text-3xl font-extrabold h-80 w-full relative flex flex-col items-center justify-center text-center">
            <div className='absolute w-full h-full bg-black/50 z-20'></div>

            <div className='z-30 p-4'>
                <h1 className='text-3xl'>Welcome to the Party!</h1>
                <h2>Find the latest club events</h2>
            </div>
            
            <Image alt='DJ' src={showcaseImg} className='absolute w-full h-full object-cover'/>
        </div>
    </>
  )
}

export default Showcase