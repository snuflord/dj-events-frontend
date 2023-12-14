import cookie from  'cookie'

// helper function to parse cookie from header.

export function parseCookies(req) {
    return cookie.parse(req ? req.headers.cookie || '' : '')
}