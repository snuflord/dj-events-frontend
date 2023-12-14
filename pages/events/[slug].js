// the name of this file 'slug' is simply the parameter name; it could also be something like 'id'. Console log router to see query > {slug (in this case)} > value.

import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import { useRouter } from 'next/router'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import defaultImage from '../../styles/images/event-default.png'

// THIS IS THE EVENT PAGE WHICH DISPLAYS ONCE CLICKING AN EVENT ITEM, IT FIND THE EVENTS VIA SLUG PARAMS IN THE GETSTATICPROPS FETCH REQUEST BELOW.
export default function EventPage({ evt }) {
  const router = useRouter()

  const { attributes } = evt
  console.log(attributes)

  

  // const deleteEvent = async (e) => {
    

  //   // asking to confirm, if yes, delte request.
  //   if(confirm('Are you sure?')) {
  //     const res = await fetch(`${API_URL}/api/events/${evt.id}`, {
  //       method: 'DELETE',
  //     })

  //     // return data
  //     const data = await res.json()

  //     // error message if something wrong
  //     if(!res.ok) {
  //       toast.error(data.message)
  //       // redirect once deleted
  //     } else {
  //       router.push('/events')
  //     }
  //   }
  // };
 
  return (
    <Layout>
        <div className="relative pt-5">
          {/* <div className="flex my-2 items-center sm:flex-col sm:absolute top-0 right-8 space-y-3">
            <Link className="flex sm:ml-5 items-center" href={`/events/edit/${evt.id}`}>
              <FaPencilAlt className="mr-3"/> Edit Event
            </Link>
            <a href="#" className="mt-0 ml-5 text-red-400 flex items-center" onClick={deleteEvent}>
              <FaTimes className="mr-3"/> Delete Event
            </a>
          </div> */}

          <span className="font-bold">
            {new Date(attributes.date).toLocaleDateString("en-UK")} at{" "}{attributes.time}
          </span>
          
          <h1 className="text=1xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 font-bold py-2">{attributes.name}</h1>

          <ToastContainer />
          
          {attributes.image && (
          <div className="my-5 w-full">
            <Image
              src={attributes.image.data ? attributes.image.data.attributes.formats.large.url : defaultImage}
              alt="Event Image"
              width={960}
              height={600}
              className="rounded-lg w-full h-auto"
            />
          </div>
        )}

          <div className="space-y-3">
            <h3 className="font-bold text-xl md:tex-2xl">Performers:</h3>
            <p>{attributes.performers}</p>
            <h3 className="font-bold text-xl md:tex-2xl">Description</h3>
            <p>{attributes.description}</p>
            <h3 className="font-bold text-xl md:tex-2xl">Venue: {attributes.venue}</h3>
            <p>{attributes.address}</p>
          </div>

          <Link href='/events' className="btn btn-primary mt-3">Back to Events</Link>
          
        </div>
    </Layout>
  );
}
 
// Looks at your data, creates paths from slugs/ids
// This function gets called at build time
export async function getStaticPaths() {
  // Call strapi external API endpoint to get events
  const res = await fetch(`${API_URL}/api/events?populate=*&_sort=date:ASC`);
  const json = await res.json();
  const events = json.data;
 
  // Get the paths we want to pre-render based on events
  const paths = events.map((evt) => {
    return {
      params: { slug: evt.attributes.slug },
    };
  });
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return {
    paths,
    fallback: true,
  };
}
 
// From the slug provided via staticpaths, pulls event information for particular slug
export async function getStaticProps({ params: { slug } }) {
  // params contains the event `slug` via above slug: evt.attributes.slug.
  // If the route is /events/hello, then params.slug is hello, e.g.

  // as of 09/23, the url params are as follows: api/events?populate* will populate all data for all events in Strapi 'events' collection.
  // https://docs.strapi.io/dev-docs/api/rest/filters-locale-publication

  // this request says, get the events, filter by slugs equal to the slug variable, and populate all equal to that slug. 
  const res = await fetch(`${API_URL}/api/events?filters[slug][$eq]=${slug}&populate=*`);
  const json = await res.json();
  const events = json.data;
  
 
  // Pass event data to the page via props: evt, which is then passed to 'attributes'
  return {  props: { evt: events[0] },
            revalidate: 1
          };
}
 
// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events?filters[slug][$eq]=${slug}&populate=*`)
//   const events = await res.json()
//   console.log(events)

//   return {
//     props: {
//       event: events[0],
//     },
//   }
// }

