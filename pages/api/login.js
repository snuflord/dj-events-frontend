import { API_URL } from "@/config";
// https://github.com/jshttp/cookie
import cookie from 'cookie'

// THIS IS THE LOGIN API REQUEST, NOT THE LOGIN PAGE

// Login function - THIS route is a 'middleman' for strapi:

export default async (req, res) => {

    if(req.method === 'POST') {
        // if the method is post, destructure the email and password from the request body (in the login function of AuthContext)
        const { identifier, password } = req.body

        // another post request in the post request from AuthContext login function: passes in the email and password from the request body set in AuthContext, which itself comes from the form data in the login page.
        const strapiRes = await fetch(`${API_URL}/api/auth/local`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                identifier,
                password
            })
        })

        const data = await strapiRes.json()

        // this data is the profile and the JWT, which is 
        console.log('api/login:', data)

        // if we have successful data (user data which includes the JWT)
        if(strapiRes.ok) {
            // set cookie: JWT in the header of the response.
            res.setHeader(
                    'Set-Cookie',
                    cookie.serialize('token', data.jwt, {
                    httpOnly: true,
                    // if equal to development, false. 
                    secure: process.env.NODE_ENV !== 'development',
                    maxAge: 60 * 60 * 24 * 7, // 1 week
                    sameSite: 'strict',
                    // accessible for everywhere around site in http header:
                    path: '/',
                })
              )
            // ok status and user data returned, made available to authContext Login function, returned as 'data, and set in the state as setUser(data.user) - without JWT.
            res.status(200).json({user: data.user})
        } else {
            // otherwise error
            res.status(data.error.status).json({message: data.error.details})
        }

        
        // if the request is anything other than POST (from the login submit)
    } else {
        res.setHeader('Allow', ['POST'])
        // 405 - method not allowed.
        res.status(405).json({message: `Method ${req.method} not allowed`})
    }
}