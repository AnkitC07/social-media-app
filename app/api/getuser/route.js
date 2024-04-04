import { NextResponse } from "next/server";
import { getUser } from "../../../helpers/getUser.js";

export const GET = async (request) => {
    try {
        const id = request.nextUrl.searchParams.get("id");
        const requestedUser = await getUser(id);

        return NextResponse.json({
            success: true,
            user: requestedUser,
        });
    } catch (error) {
        console.log("Error in get user Api:", error);
        return NextResponse.json(
            {
                error: error.message,
            },
            { status: 500 }
        );
    }
};
