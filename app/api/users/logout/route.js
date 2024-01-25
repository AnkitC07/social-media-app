import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const response = NextResponse.json({
            message: 'Logout successfull',
            success: true
        });
        // Remove the token from cookie
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        });

        return response
        
    } catch (error) {
        console.log("Something went wrong!", error);
        return NextResponse.json(
            {
                error: error.message,
            },
            {
                status: 500,
            }
        );
    }
};
