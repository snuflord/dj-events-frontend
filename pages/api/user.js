import { API_URL } from "@/config";
// https://github.com/jshttp/cookie
import cookie from 'cookie'

// USER API request - fired on useEffect CheckUserLoggedIn


export default async (req, res) => {

    if(req.method === 'GET') {

        if(!req.headers.cookie) {
            // 403 forbidden
            res.status(403).json({message: 'Not Authorised'})
            return
        }

        // token in variable. cookie.parse from package/method(params)
        const {token} = cookie.parse(req.headers.cookie)
        // get the user, pass in JWT from headers
        const strapiRes = await fetch(`${API_URL}/api/users/me`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const user = await strapiRes.json()

        if(strapiRes.ok) {
            // send status ok and user object
            res.status(200).json({ user })
        } else {
            res.status(403).json({message: 'user forbidden'})
        }

    } else {
        res.setHeader('Allow', ['GET'])
        res.status(405).json({message: `Method ${req.method} not allowed`})
    }
}