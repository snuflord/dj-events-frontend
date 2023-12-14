import { API_URL } from "@/config";
// https://github.com/jshttp/cookie
import cookie from 'cookie'

// THIS IS THE REGISTER API REQUEST

export default async (req, res) => {

    if(req.method === 'POST') {
        // if the method is post, destructure values from the request body (in the register function of AuthContext, which comes from the register form).
        const { username, email, password } = req.body

        const strapiRes = await fetch(`${API_URL}/api/auth/local/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        })

        const data = await strapiRes.json()

        console.log('api/register:', data)

        // if we have successful data (user data which includes the JWT)
        if(strapiRes.ok) {
            // set cookie: JWT in the header of the response.
            res.setHeader(
                'Set-Cookie',
                cookie.serialize('token', data.jwt, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV !== 'development',
                  maxAge: 60 * 60 * 24 * 7, // 1 week
                  sameSite: 'strict',
                  path: '/',
                })
              )
            // ok status and user data returned
            res.status(200).json({user: data.user})
        } else {
            // otherwise error
            res.status(data.error.status).json({message: data.error.details})
        }
        // if the request is anything other than POST (from the login submit)
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).json({message: `Method ${req.method} not allowed`})
    }
}