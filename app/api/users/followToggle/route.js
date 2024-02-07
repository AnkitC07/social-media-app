import { NextResponse } from "next/server";
import User from "../../../../models/userModel.js";
import { connect } from "../../../../dbConfig/dbConfig.js";

await connect();

export async function POST(request) {
    try {
        const { followeeId, action } = await request.json();
        const requestHeaders = new Headers(request.headers);
        const userId = requestHeaders.get("x-user-_id");
        const followerId = userId;
        console.log(followerId)

        let updateQuery;

        if (action === "follow") {
            updateQuery = { $addToSet: { following: followeeId } };
        } else if (action === "unfollow") {
            updateQuery = { $pull: { following: followeeId } };
        } else {
            return NextResponse.json({ error: "Invalid action" }, { status: 400 });
        }

        // Update the follower's 'following' array
        await User.findByIdAndUpdate(followerId, updateQuery).exec();

        // If it's a follow action, also update the followee's 'followers' array
        if (action === "follow") {
            await User.findByIdAndUpdate(followeeId, { $addToSet: { followers: followerId } }).exec();
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error in follow/unfollow:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
