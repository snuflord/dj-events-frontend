import Link from "next/link"

export default function Pagination({page, total}) {
const PER_PAGE = 5

// to get the last page, divide the total pages by the amount per page
  const lastPage = Math.ceil(total / PER_PAGE)
  

  return (
    <>
        {/* Pagination: if page is greater than 1 */}
        {page > 1 && (
            <Link className='btn btn-secondary mx-1' href={`/events?page=${page -1}`}>Prev</Link>
        )}
        {page < lastPage && (
            <Link className='btn btn-secondary mx-1' href={`/events?page=${page +1}`}>Next</Link>
        )}
    </>
  )
}
