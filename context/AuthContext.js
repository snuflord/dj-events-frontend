import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "@/config";

const AuthContext = createContext()

export const AuthProvider =  ({children}) => {
    
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)

    const router = useRouter()

    // This use effect runs to check that the user is logged in, persisting logged in state on page reload. 
    useEffect(() => {
        // Check if user is logged in - uses cookie in header to check who the logged in user is and set them in the state. 
        const checkUserloggedIn = async (user) => {
            // response to local api route (GET)
            const res = await fetch(`${NEXT_URL}/api/user`)
            const data = await res.json()
    
            if(res.ok) {
                // get user and set in state.
                setUser(data.user);
                console.log(data.user)
            } else {
                setUser(null)
            }
        }
        checkUserloggedIn();
    }, []);

    
    // Register User - this function is called in the register page, provided by this AuthContext. This function makes a request to the api > register API request (a POST method)

    const register = async (user) => {
        // This request is made to /api/register (see pages > api > register.js)
        const res = await fetch(`${NEXT_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            // body is the email and password from the form
            body: JSON.stringify(user)
        })
        const data = await res.json()
        console.log(data)

        if(res.ok) {
            // setUser is the function to set the state
            setUser(data.user)
            router.push('/account/dashboard')
        } else {
            setError(data)
            // setError(null)
        }
    }

    // Login user - fires on submit of login form, takes in email (identifier for strapi) and password 

    const login = async ({email: identifier, password}) => {
        
        // This request is made to login/api (see pages > api > login.js) - so targeting the API endpoint in THIS project, which then makes a request to Strapi URL. 
        const res = await fetch(`${NEXT_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            // body is the email and password from the form
            body: JSON.stringify({ identifier, password })
        })
        const data = await res.json()
        console.log(data)

        if(res.ok) {
            setUser(data.user)
            router.push('/account/dashboard')
        } else {
            setError(data)
            // setError(null)
        }
    }

    // Logout User

    const logout = async () => {
        
        const res = await fetch(`${NEXT_URL}/api/logout`, {
            method: 'POST'
        })

        if(res.ok) {
            setUser(null)
            router.push('/')
        }
    }


    return (
        <AuthContext.Provider value={{user, error, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext


// We don't want to make request to strapi for authorisation in our client side - unsafe method - open to cross site scripting attacks. 

// We can create API routes within strapi that run on the server side, so we will set them there. Http only cookie will be used, which cannot be accessed via the browser via javascript etc. 