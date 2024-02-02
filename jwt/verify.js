import jwt from "jsonwebtoken";

const verifyJWT = (request) => {
    const token = request.cookies.get("token")?.value || "";

    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

    return decodedToken
}

export default verifyJWT;