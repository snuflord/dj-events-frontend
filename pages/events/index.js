// Part of 'events' nested route. this is events/

import Layout from "@/components/Layout"
import EventItem from "@/components/EventItem"
import { API_URL, PER_PAGE } from "@/config/index"
import Pagination from "@/components/Pagination"

export default function EventsPage({events, page, total}) {

  console.log(events)

  return (
    <Layout>
      <h1 className="text-lgt md:text-6xl underline underline-offset-4 pb-6">Events</h1>
      <h3 className="text-2xl">Check out the latest upcoming events</h3>

      {events.length === 0 && <h3>No Events currently</h3>}

      {events.map(evt => (
        <EventItem key={evt.id} evt={evt.attributes}/>
      ))}

      <Pagination total={total} page={page}/>

    </Layout>
  )
}


export async function getServerSideProps( {query: {page = 1}} ) {
  
  // calculate start page. parseint turns string to number.
  // if page number 1, start index 0, otherwise 0 x 5
  const start = parseInt(page) === 1 ? 0 : (+page -1) * PER_PAGE

  // fetch events + total, + page
  const eventRes = await fetch(`${API_URL}/api/events?populate=*&_sort=date:ASC&pagination[limit]=${PER_PAGE}&pagination[start]=${start}`);
  const eventsData = await eventRes.json();
  const events = eventsData.data;
  const meta = eventsData.meta;
  console.log(eventsData)
 
  return {
    props: { 
          events: events,
          page: parseInt(page),
          total: meta.pagination.total  
        },
  };
}

