// Part of events - this is events/add

import Layout from "@/components/Layout"
import Image from "next/image";
import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { API_URL } from "@/config"
import { toast, ToastContainer } from 'react-toastify';
import { formatDateForInput } from "@/utilities/formatDate"
import "react-toastify/dist/ReactToastify.css";
import { FaImage } from 'react-icons/fa'
import { Dialog } from "@headlessui/react";
import ImageUpload from "@/components/ImageUpload";
import defaultImage from '../../../styles/images/event-default.png'
import { parseCookies } from "@/helpers";

export default function EditEventPage( {event, token} ) {

  const { attributes } = event
  // console.log(attributes)
  // console.log(event)
  
  // all initial empty values
  const [values, setValues] = useState({
    id: event.id,
    name: attributes.name,
    performers: attributes.performers,
    venue: attributes.venue,
    address: attributes.address,
    date: formatDateForInput(attributes.date,),
    time: attributes.time,
    description: attributes.description,
  })

  // state to handle the image preview thumbnail. This is initially taken from the item image data via ID, or is the default image. The preview image updates when the imageUploaded function runs. 
  const [imagePreview, setImagePreview] = useState(attributes.image.data ? attributes.image.data.attributes.formats.thumbnail.url : defaultImage)

  let [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen(open => !open)
  }

  const router = useRouter()

  const handleInputChange = (e) => {
    
    // the 'name' property in each input allows state to be changed with one function.
    const {name, value} = e.target

    // spread operator across values, update state with the value of target.
    setValues({...values, [name]: value})


    console.log(values)
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    // Validation

    // look at the values of the 'values' object above.
    // the 'some' method looks through the elements and checks whether any of them have empty values. If any return empty values, they are 'hasEmptyFields'.
    const hasEmptyFields = Object.values(values).some((element) => element === '')

    if(hasEmptyFields ) {
      
      toast.error("Please fill in all fields", {
        position: toast.POSITION.TOP_RIGHT
      });
    } 

    const res = await fetch(`${API_URL}/api/events/${values.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ data: values })
    })

    if(!res.ok) {
      toast.error("Something went wrong")
    } else {
      const evt = await res.json()
      console.log(evt)
      console.log('event updated')
      router.push(`/events/${evt.slug}`)
    }
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
        <Link className="btn btn-primary" href='/events'>All Events</Link>
        <Link className="btn btn-primary ml-2" href='/account/dashboard'>Back to dashboard</Link>
        <h1 className="text=1xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 font-bold py-2">Edit Event</h1>

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

            <button className="btn btn-secondary mt-5" onClick={handleSubmit} type="submit" value="submit">Update Event</button>
        </form>

        <div className="mt-3">
          <h2 className='font-bold text-2xl mb-2'>Event Image</h2>
          {imagePreview ? (
            <Image
            src={attributes.image.data ? imagePreview : defaultImage}
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
            <ImageUpload evtId={event.id} imageUploaded={imageUploaded} />
            
          </Dialog.Panel>
        </Dialog>

    </Layout>
  )
}

// params contains the event data for the id, req contains the cookie as long as a user is signed in. 
export async function getServerSideProps({ params: { id }, req }) {
  
  const {token} = parseCookies(req)
  const res = await fetch(`${API_URL}/api/events/${id}?populate=*`)
  const evt = await res.json()
  const returnedEvent = evt.data;

  return {
    props: {
      event: returnedEvent,
      token: token,
    },
  }
}

