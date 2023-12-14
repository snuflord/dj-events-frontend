// Part of 'events' nested route. this is events/


import Layout from "@/components/Layout"
import EventItem from "@/components/EventItem"
import { API_URL } from "@/config/index"
import QueryString from "qs"
import { useRouter } from "next/router"
import Link from "next/link"

export default function searchPage({events}) {

   const router = useRouter(); 

  return (
    <Layout title="Search Results">
        
      <h1 className="text-lgt md:text-6xl pb-6">Search Results for <i className="underline">{router.query.term}</i></h1>
      <h3 className="text-2xl">Check out the latest upcoming events:</h3>

      {events.length === 0 && <h3>No Events currently</h3>}

      {events.map(evt => (
        <EventItem key={evt.id} evt={evt.attributes}/>
      ))}
      <br/>
      <Link className="btn btn-primary" href='/events'>Back to Events</Link>
    </Layout>
  )
}


export async function getServerSideProps({query: {term}}) {

    const query = QueryString.stringify(
        {
          filters: {
            // the 'or' and 'contains' operators: https://docs.strapi.io/dev-docs/api/rest/filters-locale-publication#filtering
            $or: [
              {
                name: {
                  $contains: term,
                },
              },
              {
                performers: {
                  $contains: term,
                },
              },
              {
                description: {
                  $contains: term,
                },
              },
              {
                venue: {
                  $contains: term,
                },
              },
            ],
          },
        },
        {
          encodeValuesOnly: true, // prettify URL
        }
      );

  const res = await fetch(`${API_URL}/api/events?${query}&populate=*`);
  const eventsData = await res.json();
  const events = eventsData.data;
  console.log(events)
 
  return {
    props: { events },

  };
}

