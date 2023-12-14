import { API_URL } from "@/config";
// https://github.com/jshttp/cookie
import cookie from 'cookie'

// LOGOUT API request

export default async (req, res) => {

    if(req.method === 'POST') {

        // destroy cookie
        res.setHeader(
            'Set-Cookie',
            // token set to empty string
            cookie.serialize('token', '', {
              httpOnly: true,
              secure: process.env.NODE_ENV !== 'development',
              // expires (in the past)
              expires: new Date(0),
              sameSite: 'strict',
              path: '/',
            })
          )
        // ok status and user data returned
        res.status(200).json({message: 'Success'})


    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).json({message: `Method ${req.method} not allowed`})
    }
}