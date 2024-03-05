export const dynamic = 'auto'
import { NextResponse } from "next/server";
import Hashtag from "../../../../models/hashtagModel.js";
import { connect } from "../../../../dbConfig/dbConfig.js";

await connect();

export async function GET(request) {
    try {

        const trendingHashtags = await Hashtag.aggregate([
            {
                $project: {
                    hashtag: 1,
                    tweetCount: { $size: "$tweets" }, // Count the number of tweets for each hashtag
                },
            },
            { $sort: { tweetCount: -1 } }, // Sort by tweet count in descending order
            { $limit: 3 }, // Limit to the top N trending hashtags
        ]);

        return NextResponse.json({ tags: trendingHashtags, success: true });
    } catch (error) {
        console.error("Error in Trending tags:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
