import { NextResponse } from "next/server";
import User from "../../../../models/userModel.js";
import Tweet from "../../../../models/tweetModel.js";
import { connect } from "../../../../dbConfig/dbConfig.js";

await connect();

export async function POST(request) {
    try {
        const { postId, action } = await request.json();
        const requestHeaders = new Headers(request.headers);
        const userId = requestHeaders.get("x-user-_id");
        const followerId = userId;
        console.log(followerId);

        let updateQuery;
        let updateQueryUser;

        if (action === "like") {
            updateQuery = { $addToSet: { likes: followerId } };
            updateQueryUser = { $push: { likedTweet: postId } };
        } else if (action === "unlike") {
            updateQuery = { $pull: { likes: followerId } };
            updateQueryUser = { $pull: { likedTweet: postId } };
        } else {
            return NextResponse.json({ error: "Invalid action" }, { status: 400 });
        }

        // Update the follower's 'following' array
        const updatedTweet = await Tweet.findByIdAndUpdate(postId, updateQuery, {
            new: true,
        }).exec();
        await User.findByIdAndUpdate(followerId, updateQueryUser).exec();

        console.log("test=>", updatedTweet);
        return NextResponse.json({ likes:updatedTweet.likes,success: true });
    } catch (error) {
        console.error("Error in like/unlike:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
