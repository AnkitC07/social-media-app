import * as jose from 'jose'

const verifyJWT = async (request) => {
    const token = request.cookies.get("token")?.value || "";
    const encodedKey = new TextEncoder().encode(process.env.JWT_TOKEN_SECRET);
    const decoded = await jose.jwtVerify(token, encodedKey); 
    return decoded;
}

export default verifyJWT