import verifyJWT from "../jwt/verifyOnEdge";

const isAuthenticated = async (request) => {
    try {
        const token = request.cookies.get("token")?.value || "";
        if (token) {
            const decoded = await verifyJWT(request);

            let userData;
            await fetch("http://localhost:3000/api/auth", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(decoded),
            }).then(res=>res.json()).then(data=>userData=data?.user)
            if (userData) {
                return userData;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (error) {
        console.error("Authentication error:", error);
        return false;
    }
};

export default isAuthenticated;
