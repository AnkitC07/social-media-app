export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import Tweet from "../../../../models/tweetModel";
import User from "../../../../models/userModel";
import Reply from "../../../../models/replyModel";
import { connect } from "../../../../dbConfig/dbConfig.js";

await connect();

export async function GET(request, { params, query }) {
    try {
        const limit = 5;
        const requestHeaders = new Headers(request.headers);
        const userId = requestHeaders.get("x-user-_id");
        const page = request.nextUrl.searchParams.get("page");

        // console.log("testing-",request)

        // Assuming userId is the ID of the currently logged-in user
        const currentUser = await User.findById(userId).select("following").exec();

        if (currentUser) {
            // Get the IDs of users that the current user is following
            const followingUserIds = [...currentUser.following];

            // Use these IDs to retrieve tweets from the users the current user is following
            // const tweetsFromFollowingUsers = await Tweet.find({ user: { $in: followingUserIds } })
            //     .select("text user createdAt likes replies ")
            //     .limit(limit * 1)
            //     .skip((page - 1) * limit)
            //     .sort("-createdAt") // Sort by createdAt in descending order to get the latest tweets first
            //     .populate({
            //         path: "replies",
            //         populate: { path: "user" },
            //     }) // Populate the replies field with  comments on the post
            //     .populate("user") // Populate the 'user' field with user details
            //     .exec();

            const aggregation = [
                {
                    $match: {
                        user: { $in: followingUserIds },
                    },
                },
                {
                    $project: {
                        text: 1,
                        user: 1, // Include the entire user document for now
                        createdAt: 1,
                        likes: 1,
                        images: 1,
                        // replies: 1,
                        likeCount: { $size: "$likes" },
                        replyCount: { $size: "$replies" },
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
                        // Second project stage for user projection
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
                    $skip: (page - 1) * limit,
                },
                {
                    $limit: limit,
                },
            ];
            const result = await Tweet.aggregate(aggregation);
            // console.log("testing aggrigation=>", await Tweet.aggregate(aggregation), );
            return NextResponse.json(result);
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
