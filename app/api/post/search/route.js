import { NextResponse } from "next/server";
import User from "../../../../models/userModel";
import Hashtag from "../../../../models/hashtagModel";

export const GET = async (request) => {
    try {
        const searchParams = request.nextUrl.searchParams;
        const query = searchParams.get("q");
        const requestHeaders = new Headers(request.headers);
        const userId = requestHeaders.get("x-user-_id");
        console.log(query, userId);


        const users = await User.find({
            username: { $regex: `^\\s?(?i:${query})`, $options: "i" }
        });

        let hashtags = await Hashtag.find({
            hashtag: { $regex: `^${query}`, $options: "i" }
        }).limit(query == '' ? 5 : null)
        
        console.log(users,hashtags)

        return NextResponse.json(
            {
                message: `Search successfuly`,
                success: true,
                users,
                hashtags
            },
            { status: 200 }
        );
    } catch (error) {
        console.log("Something went wrong in search api: ", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
