import { NextRequest } from "next/server";


export  function getTokenData(request) {
    try {
        const token = request.cookies.get("token")?.value || "";

        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

        return decodedToken.id
    } catch (error) {
        throw new Error(error.message)
    }
}