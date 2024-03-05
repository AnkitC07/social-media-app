export const dynamic = 'auto'
import { NextResponse } from "next/server";
import User from "../../../../models/userModel";
import Hashtag from "../../../../models/hashtagModel";

export async function GET (request){
    try {
        const searchParams = request.nextUrl.searchParams;
        const query = searchParams.get("q");
        const requestHeaders = new Headers(request.headers);
        const userId = requestHeaders.get("x-user-_id");
        console.log(query, userId);

        const users =
            query !== ""
                ? await User.find({
                      $or: [
                          { username: { $regex: `(?i:${query})` } },
                          { fullName: { $regex: `(?i:${query})` } },
                          // { username: { $regex: `^\\s?(?i:${query})`, $options: "i" } },
                          // { fullName: { $regex: `^\\s?(?i:${query})`, $options: "i" } }
                      ],
                  })
                : [];

        // const hashtags = await Hashtag.aggregate([
        //     {
        //         $match: {
        //             ...(query ? { hashtag: { $regex: new RegExp(query, "i") } } : {}), // Regular expression for case-insensitive search
        //         },
        //     },
        //     {
        //         $project: {
        //             hashtag: 1,
        //             tweetCount: { $size: "$tweets" }, // Count the number of tweets for each hashtag
        //         },
        //     },
        //     { $sort: { tweetCount: -1 } }, // Sort by tweet count in descending order
        //     { $limit: query == "" ? 4 : null }, // Limit to the top N trending hashtags
        // ]);

        let hashtags = await Hashtag.find({
            hashtag: { $regex: `^${query}`, $options: "i" },
        });

        return NextResponse.json(
            {
                message: `Search successfuly`,
                success: true,
                users,
                hashtags,
            },
            { status: 200 }
        );
    } catch (error) {
        console.log("Something went wrong in search api: ", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
