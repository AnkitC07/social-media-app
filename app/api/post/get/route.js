export const dynamic = 'force-dynamic'
import { NextResponse } from "next/server";
import Tweet from "../../../../models/tweetModel";
import User from "../../../../models/userModel";
import "../../../../models/replyModel";
import { connect } from "../../../../dbConfig/dbConfig.js";

await connect();

export async function GET(request,{params,query}) {
    try {
        const limit = 5;
        const requestHeaders = new Headers(request.headers);
        const userId = requestHeaders.get("x-user-_id");
        const page = request.nextUrl.searchParams.get("page");

        console.log("testing-",request)
       

        // Assuming userId is the ID of the currently logged-in user
        const currentUser = await User.findById(userId).exec();

        if (currentUser) {
            // Get the IDs of users that the current user is following
            const followingUserIds = [...currentUser.following];

            // Use these IDs to retrieve tweets from the users the current user is following
            const tweetsFromFollowingUsers = await Tweet.find({ user: { $in: followingUserIds } })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .sort("-createdAt") // Sort by createdAt in descending order to get the latest tweets first
                .populate({
                    path: "replies",
                    populate: { path: "user" },
                }) // Populate the replies field with  comments on the post
                .populate("user") // Populate the 'user' field with user details
                .exec();
                // console.log("page-home", page,tweetsFromFollowingUsers);
            // console.log("Tweets from following users:", tweetsFromFollowingUsers);
            return NextResponse.json(tweetsFromFollowingUsers);
        } else {
            console.log("User not found");
            return NextResponse.json(
                {
                    error: "User not found",
                },
                {
                    status: 404,
                }
            );
        }
    } catch (error) {
        console.log("Something went wrong in Post Get:", error);
        return NextResponse.json(
            {
                error: error.message,
            },
            { status: 500 }
        );
    }
}
