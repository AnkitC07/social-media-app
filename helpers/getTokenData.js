import jwt from "jsonwebtoken";
import verifyJWT from "../jwt/verify";



export function getTokenData(request) {            
    try {
        const decodedToken =verifyJWT(request)
        return decodedToken.id
    } catch (error) {
        return new Error(error.message);
    }
}