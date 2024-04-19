import { NextResponse } from "next/server";
import Tweet from "../../../../../models/tweetModel.js";
import "../../../../../models/userModel.js";
import "../../../../../models/replyModel.js";
import { connect } from "../../../../../dbConfig/dbConfig.js";
import mongoose from "mongoose";
import User from "../../../../../models/userModel.js";
export const dynamic = 'force-dynamic'

await connect();

export async function GET(request) {
    try {
        const limit = 5;
        const requestHeaders = new Headers(request.headers);
        let userId;
        // Assuming userId is the ID of the currently logged-in user
        const page = request.nextUrl.searchParams.get("page");
        const query = request.nextUrl.searchParams.get('id'); 

        if (query == "user") {
            userId = requestHeaders.get("x-user-_id");
        } else {
            userId = query;
        }

        if (userId) {
            // Get the IDs of users that the current user is following

            // Use these IDs to retrieve tweets from the users the current user is following
            // const tweetsFromProfile = await Tweet.find({ user:  new mongoose.Types.ObjectId(userId)  })
            //     .limit(limit * 1)
            //     .skip((page - 1) * limit)
            //     .sort("-createdAt") // Sort by createdAt in descending order to get the latest tweets first
            //     .populate("user") // Populate the 'user' field with user details
            //     .populate({
            //         path: "replies",
            //         populate: { path: "user" },
            //     }) // Populate the replies field with  comments on the post
            //     .exec();

            // console.log("page-profile", page, tweetsFromProfile);


            // const tweets = await User.aggregate([
            //     {
            //         $match: { _id: new mongoose.Types.ObjectId(userId) }, // Match document by _id (converted to ObjectId)
            //     },
            //     {
            //         $lookup: {
            //             from: "tweets",
            //             localField: "tweets",
            //             foreignField: "_id",
            //             as: "tweets",
            //         }
            //     }
            // ])



            const aggregation = [
                {
                    $match: {
                        user: { $eq: new mongoose.Types.ObjectId(userId)  },
                    },
                },
                {
                    $project: {
                        text: 1,
                        user: 1, // Include the entire user document for now
                        createdAt: 1,
                        likes: 1,
                        images: 1,
                        replies: 1,
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
            // console.log("testing aggrigation profile=>", await Tweet.aggregate(aggregation), );

            // console.log("Tweets from non-following users:", tweetsFromFollowingUsers);
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
        console.log("Something went wrong in Post Profile Get:", error);
        return NextResponse.json(
            {
                error: error.message,
            },
            { status: 500 }
        );
    }
}

