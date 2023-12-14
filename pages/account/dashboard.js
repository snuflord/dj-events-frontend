import Layout from "@/components/Layout"
import { API_URL } from "@/config"
import { parseCookies } from "@/helpers"
import DashboardEvents from "@/components/DashboardEvents"
import { toast, ToastContainer } from 'react-toastify';



export default function DashboardPage({myEvents, token}) {

  console.log(myEvents)

  const deleteEvent = async (id) => {
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/api/events/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type' : 'application/json',
          Authorization: `Bearer ${token}`
        },
      })

      // const data = await res.json()
      
      if(!res.ok ) {
        
        toast.error("Something went wrong", {
          position: toast.POSITION.TOP_RIGHT
        });
      } else {
        router.reload()
      }
    }
  }

  return (

    <Layout title='User Dashboard'>
      {/* <ToastContainer /> */}
      
      <div className="">
        
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <h3 className="text-2xl font-bold mb-4">My Events</h3>

        {myEvents.map((evt) => (
          <DashboardEvents key={evt.id} evt={evt} handleDelete={deleteEvent}/>
        ))}
      </div>
    </Layout>
  )
}

export async function getServerSideProps({req}) {
  const {token} = parseCookies(req)

  const res = await fetch(`${API_URL}/api/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const events = await res.json();
  const eventsData = events.data
  
  return {
    props: {
      myEvents: eventsData,
      token: token
    },
  }
}