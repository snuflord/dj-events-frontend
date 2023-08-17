

// the name of this file 'slug' is simply the parameter name; it could also be something like 'id'. Console log router to see query > {slug (in this case)} > value.

import Layout from "@/components/Layout"

export default function EventPage() {


  return (
    <Layout>
        <h1>My Event</h1>
        <p>This is an app to find the latest DJ's and events near you!</p>
    </Layout>
  )
}

