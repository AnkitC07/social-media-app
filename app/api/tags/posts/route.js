export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import Hashtag from "../../../../models/hashtagModel.js";
import Tweets from "../../../../models/tweetModel.js";
import { connect } from "../../../../dbConfig/dbConfig.js";

await connect();

export async function GET(request) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const tag = searchParams.get("tag");
        console.log("tags=>", tag);

        const trendingTweets = await Hashtag.findOne({ hashtag: tag })
            .populate({
                path: "tweets",
                populate: { path: "user" },
            })
            .exec();

        const aggregation = [
            {
                $match: {
                    hashtag: "beach",
                },
            },
            {
                $lookup: {
                    from: "tweets",
                    localField: "tweets",
                    foreignField: "_id",
                    as: "tweets",
                },
            },

            {
                $unwind: "$tweets", // Unwind user document from the lookup
            },
            {
                $project: {
                    // Project desired tweet fields directly
                    hashtag: 1,
                    text: "$tweets.text",
                    user: "$tweets.user", // Include the entire user document for now
                    createdAt: "$tweets.createdAt",
                    likes: "$tweets.likes",
                    images: "$tweets.images",
                    // replies: 1, // Uncomment if you need replies data
                    likeCount: { $size: "$tweets.likes" },
                    replyCount: { $size: "$tweets.replies" },
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $unwind: "$user", // Unwind user document from the lookup
            },
            {
                $project: {
                    // Second project stage for user projectionhashtag: 1,
                    hashtag: 1,
                    text: 1,
                    user: {
                        // Project desired user fields here
                        _id: 1,
                        username: 1,
                        fullName: 1,
                        avatar: 1,
                    },
                    createdAt: 1,
                    likes: 1,
                    replies: 1,
                    images: 1,
                    likeCount: 1,
                    replyCount: 1,
                },
            },
            {
                $sort: { createdAt: -1 },
            },
            {
                $skip: (1 - 1) * 5,
            },
            {
                $limit: 5,
            },
        ];

        console.log("testing tags post aggrigation=>", await Hashtag.aggregate(aggregation));

        console.log("Trending Posts:", trendingTweets);

        return NextResponse.json({ posts: trendingTweets, success: true });
    } catch (error) {
        console.error("Error in Trending tags:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
