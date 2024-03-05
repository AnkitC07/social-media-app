import verifyJWT from "../jwt/verifyOnEdge";

const isAuthenticated = async (request) => {
    try {
        const token = request.cookies.get("token")?.value || "";
        if (token) {
            const decoded = await verifyJWT(request);
        
            const req = await fetch("http://z-app.netlify.app/api/auth", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(decoded),
            })
            const res = await request.json()
            console.log(res)
            //  fetch("http://z-app.netlify.app/api/auth", {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(decoded),
            // }).then(res=>res.json()).then(data=>userData=data?.user)
            let userData = res?.user
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
