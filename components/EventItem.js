import Link from "next/link"
import Image from "next/image"
import defaultImage from '../styles/images/event-default.png'

function EventItem({evt}) {
    const data = evt
    // console.log(data)
  return (

    <Link href={`/events/${data.slug}`}>
        <div className="group flex flex-col md:flex-row justify-between items-start rounded-xl md:items-center text-left my-4 mx-0 shadow-md transition-all duration-500 md:hover:bg-emerald-500">
            <div className="m-4">
                <Image className="h-32 w-34 object-cover rounded-xl" src={data.image.data.attributes.formats ? data.image.data.attributes.formats.thumbnail.url : defaultImage} width={170} height={100} alt={data.image.data.attributes.name}/>
            </div>

            <div className="grow px-4">
                <span className="font-bold">
                {new Date(data.date).toLocaleDateString("en-UK")} at{" "}{data.time}
            </span>
                <h3 className="font-bold text-md md:text-lg lg:text-2xl">{data.name}</h3>
            </div>

            <div className="m-4 md:m-0 md:mr-6">
                <div className="btn btn-primary group-hover:text-emerald-500">
                    Details</div>
            </div>
        </div>
    </Link>
    
  )
}

export default EventItem