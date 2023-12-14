// Part of events - this is events/add

import Layout from "@/components/Layout"
import Image from "next/image";
import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { API_URL } from "@/config"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { FaImage } from 'react-icons/fa'
import { Dialog } from "@headlessui/react";
import ImageUpload from "@/components/ImageUpload";
import defaultImage from '../../styles/images/event-default.png'
import { parseCookies } from "@/helpers";

export default function AddEventPage({token}) {
  
  // all initial empty values
  const [values, setValues] = useState({
    name: '',
    performers: '',
    venue: '',
    address: '',
    date: '',
    time: '',
    description: '',
  })

  const [imagePreview, setImagePreview] = useState(defaultImage)

  let [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen(open => !open)
  }

  const router = useRouter()

  const handleSubmit = async (e) => {
    console.log(values)
    e.preventDefault();
    // console.log(values)

    // Validation

    // look at the values of the 'values' object above. So the values of values... get it?
    // the 'some' method looks through the elements and checks whether any of them have empty values. If any return empty values, they are 'hasEmptyFields'.
    const hasEmptyFields = Object.values(values).some((element) => element === '')

    if(hasEmptyFields ) {
      
      toast.error("Please fill in all fields", {
        position: toast.POSITION.TOP_RIGHT
      });
    } 

    const formData = new FormData()

    formData.append('name', values.name)
    formData.append('performers', values.performers)
    formData.append('venue', values.venue)
    formData.append('address', values.address)
    formData.append('date', values.date)
    formData.append('time', values.time)

    const res = await fetch(`${API_URL}/api/events`, {
      method: 'POST',
      headers: { 
        
        Authorization: `Bearer ${token}`
      },
      body: formData,
    })

    if(!res.ok) {
      if(res.status === 403 || res.status === 401 ) {
        toast.error("No token included")
        return
      }
      toast.error("Something went wrong")
    } else {

      const evt = await res.json()
      console.log(evt)
      // router.push(`/events/${evt.slug}`)
    }
  }

  const handleInputChange = (e) => {
    
    // the 'name' property in each input allows state to be changed with one function.
    const {name, value} = e.target

    // spread operator across values, update state with the value of target.
    setValues({...values, [name]: value})
  }

  const imageUploaded = async (e) => {
    
    const res = await fetch(`${API_URL}/api/events?filters[id][$eq]=${event.id}&populate=*`)
    const data = await res.json()
    console.log(data)

    setImagePreview(data.data[0].attributes.image.data.attributes.formats.thumbnail.url)
    console.log(imagePreview)
    setIsOpen(false)
  }

  return (
    <Layout title='Add New Event'>
      
      <ToastContainer />

      <Link className="btn btn-primary" href='/events'>Back to Events</Link>

      <h1 className="text=1xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 font-bold py-2">Add Event</h1>

      <form onSubmit={handleSubmit}> 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <label className='font-bold mb-2' htmlFor='name'>Event Name</label>
              <input className="bg-white h-4 p-4 rounded" type='text' id='name' name='name' value={values.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label className='font-bold mb-2' htmlFor='performers'>Performers</label>
              <input className="bg-white h-4 p-4 rounded" type='text' name='performers' id='performers' value={values.performers}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label className='font-bold mb-2' htmlFor='venue'>Venue</label>
              <input className="bg-white h-4 p-4 rounded" type='text' name='venue' id='venue' value={values.venue}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label className='font-bold mb-2' htmlFor='address'>Address</label>
              <input className="bg-white h-4 p-4 rounded" type='text' name='address' id='address' value={values.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label className='font-bold mb-2' htmlFor='date'>Date</label>
              <input className="bg-white h-4 p-4 rounded" type='date' name='date' id='date' value={values.date}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label className='font-bold mb-2' htmlFor='time'>Time</label>
              <input className="bg-white h-4 p-4 rounded" type='text' name='time' id='time' value={values.time}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className='font-bold mb-2'  htmlFor="description">Event Description</label>
            <textarea className="bg-white h-32 p-4 rounded" type='text' name='description' id='description' value={values.description} onChange={handleInputChange}></textarea>
          </div>

          <button className="btn btn-secondary mt-5" onClick={handleSubmit} type="submit" value="submit">Submit</button>
      </form>

      <div className="mt-3">
          <h2 className='font-bold text-2xl mb-2'>Event Image</h2>
          {imagePreview ? (
            <Image
            src={defaultImage}
            alt="Event Image"
            width={170}
            height={100}
            className="rounded-lg"
          />
          ) : <div>
              <p>No image uploaded</p>
            </div>}
        </div>

        <div className="mt-2">
          <button onClick={toggleOpen} className="btn btn-secondary">
            <FaImage />  Set Image
          </button>
        </div>

        <Dialog className="fixed inset-0 flex w-screen items-center justify-center p-8" open={isOpen} onClose={() => setIsOpen(false)}>
          <Dialog.Panel className="w-full md:w-1/3 rounded-xl bg-slate-800 p-10">
            
            {/* imageUploaded function passed as prop */}
            <ImageUpload imageUploaded={imageUploaded} />
            
          </Dialog.Panel>
        </Dialog>

       
    </Layout>
  )
}

export async function getServerSideProps({req}) {
  const {token} = parseCookies(req)

  return {
    props: {
      token,
    },
  }
}
