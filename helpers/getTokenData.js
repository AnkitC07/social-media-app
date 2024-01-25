import jwt from "jsonwebtoken";



export function getTokenData(request) {            
    try {
        const token = request.cookies.get("token")?.value || "";

        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

        return decodedToken.id
    } catch (error) {
        return new Error(error.message);
    }
}