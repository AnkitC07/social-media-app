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

        let updateQuery,updateQuery1;

        if (action === "follow") {
            updateQuery = { $addToSet: { following: followeeId } };
            updateQuery1 = { $addToSet: { followers: followerId } };
        } else if (action === "unfollow") {
            updateQuery = { $pull: { following: followeeId } };
            updateQuery1 = { $pull: { followers: followerId } };
        } else {
            return NextResponse.json({ error: "Invalid action" }, { status: 400 });
        }

        // Update the follower's 'following' array
        await User.findByIdAndUpdate(followerId, updateQuery).exec();
        // Update the followee's 'followers' array
        await User.findByIdAndUpdate(followeeId, updateQuery1).exec();

        // If it's a follow action, also update the followee's 'followers' array
   
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error in follow/unfollow:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
