export const dynamic = 'auto'
import { NextResponse } from "next/server";
import Hashtag from "../../../../models/hashtagModel.js";
import Tweets from "../../../../models/tweetModel.js";
import { connect } from "../../../../dbConfig/dbConfig.js";

await connect();

export async function GET(request) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const tag = searchParams.get("tag");
console.log("tags=>",tag)

        const trendingTweets = await Hashtag.findOne({hashtag:tag}).populate({
            path: 'tweets',
            populate: { path: 'user' }
          }).exec()

        console.log("Trending Posts:", trendingTweets);

        return NextResponse.json({ posts: trendingTweets, success: true });
    } catch (error) {
        console.error("Error in Trending tags:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
