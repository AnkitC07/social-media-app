import * as jose from 'jose'

const verifyJWT = async (request) => {
    const requestHeaders = new Headers(request.headers);
    const headerToken = requestHeaders.get("token");
    const token = request.cookies.get("token")?.value || headerToken || "";
    const encodedKey = new TextEncoder().encode(process.env.JWT_TOKEN_SECRET);
    const decoded = await jose.jwtVerify(token, encodedKey); 
    return decoded;
}

export default verifyJWT