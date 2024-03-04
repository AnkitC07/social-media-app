import { NextResponse } from "next/server";
import Tweet from "../../../../../models/tweetModel.js";
import User from "../../../../../models/userModel.js";
import { connect } from "../../../../../dbConfig/dbConfig.js";
import mongoose from "mongoose";
export const dynamic = 'auto'

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
            const tweetsFromProfile = await Tweet.find({ user:  new mongoose.Types.ObjectId(userId)  })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .sort("-createdAt") // Sort by createdAt in descending order to get the latest tweets first
                .populate("user") // Populate the 'user' field with user details
                .populate({
                    path: "replies",
                    populate: { path: "user" },
                }) // Populate the replies field with  comments on the post
                .exec();

            console.log("page-profile", page, tweetsFromProfile);

            // console.log("Tweets from non-following users:", tweetsFromFollowingUsers);
            return NextResponse.json(tweetsFromProfile);
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

