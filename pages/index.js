import Layout from "@/components/Layout"
import EventItem from "@/components/EventItem"
import { API_URL } from "@/config/index"
import Link from "next/link"

export default function HomePage({events}) {

  return (
    <Layout>
      <h1 className="text-lgt md:text-6xl underline underline-offset-4 pb-6">Upcoming Events</h1>

      {events.length === 0 && <h3>No Events currently</h3>}

      {events.map(evt => (
        <EventItem key={evt.id} evt={evt.attributes}/>
      ))}

      {events.length > 0 && (
        <Link className="btn btn-primary" href='/events'>View All Events</Link>
      )}
    </Layout>
  )
}

// You can add fetch methods above or below the exported component
// Note this console log here will return in the VS code terminal as it is not rendered on the client. If we console log in the HomePage function, we will see the log in the browser!

// getServerSideProps: https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props. Will run every time we come to the page. 


// getStaticProps runs at build time: https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props. 

export async function getStaticProps() {
  const res = await fetch(
    `${API_URL}/api/events?sort=date:desc&pagination[limit]=3&populate=*`
  );
  const json = await res.json();
  const events = json.data;

  // console.log(events)
 
  return {
    props: { events },
    revalidate: 1, // seconds to ckeck if data changes on getStaticProps
  };
}