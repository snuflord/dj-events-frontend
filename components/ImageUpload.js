import { useState } from "react"
import { API_URL } from "@/config"


export default function ImageUpload({evtId, imageUploaded, token}) {

    const [image, setImage] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // setting new formdata
        const formData = new FormData()
        //
        formData.append('files', image, {filename: image.name})
        formData.append('ref', 'api::event.event') // referring to the 'events' collection in strapi
        formData.append('refId', evtId) // the event id (the id of the item e.g. Boom party)
        formData.append('field', 'image') // corresponds with strapi 'image'
        

        const res = await fetch(`${API_URL}/api/upload`, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data; boundary="WebKitFormBoundary7MA4YWxkTrZu0gW--"'
              },
        })

        if(res.ok) {
            imageUploaded() // this function is in the attributes of the component where is is called (in events/add)
        } 
    }

    const handleFileChange = (e) => {
        // log the file selected (demo) notice all the image file properties
        console.log(e.target.files[0])

        // updating the state with our selected image.
        setImage(e.target.files[0])
    }

  return (
    <div>
        <h1 className="text-2xl font-bold">Upload Event Image</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <input className="border-white bg-blue-500 my-2 btn btn-primary" type='file' onChange={handleFileChange} />
            </div>
            <button className="btn btn-primary" type='submit'>Upload</button>
        </form>
    </div>
  )
}


export async function getServerSideProps({ req }) {
    const {token} = parseCookies(req)
  
    console.log('JWT is', req.headers.cookie)
  
    return {
      props: {

        token: token,
      },
    }
}