export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { connect } from "../../../../dbConfig/dbConfig.js";
import User from "../../../../models/userModel.js";
import "../../../../models/tweetModel.js";
import "../../../../models/replyModel.js";
import { getTokenData } from "../../../../helpers/getTokenData.js";
import mongoose from "mongoose";

await connect();

export const GET = async (request) => {
    try {
        const searchParams = request.nextUrl.searchParams;
        const query = searchParams.get("id");
        let userId,profileId;
        if (query == "user") {
            userId = getTokenData(request);
            profileId = getTokenData(request);
        } else {
            profileId = query;
            userId = getTokenData(request);
        }
        const user = await getUserWithCount(userId,profileId);
        return NextResponse.json({
            message: "User Found",
            data: user,
            success:true,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message,success:false }, { status: 400 });
    }
};

async function getUserWithCount(userId, profileId) {
    // console.log("getUserWithTweetCount: ",userId,profileId);
    try {
        // Create a projection object to exclude password and tweets fields
        const projection = {
            _id: 1, // Include the _id field for clarity
            email: 0,
            followers:0,
            following:0,
            password: 0,
            tweets: 0,
            likedTweet:0,// Exclude tweets to avoid unnecessary data transfer
        };

        // Use aggregation framework for efficient retrieval and transformation
        const pipeline = [
            {
                $match: { _id: new mongoose.Types.ObjectId(profileId) }, // Match document by _id (converted to ObjectId)
            },
            {
                $addFields: {
                    tweetCount: { $size: "$tweets" }, // Calculate tweet count using $size operator
                    followerCount: { $size: "$followers" }, // Calculate tweet count using $size operator
                    followingCount: { $size: "$following" }, // Calculate tweet count using $size operator
                    isFollowed: { $in: [new mongoose.Types.ObjectId(userId), "$followers"] }
                },
            },
            {
                $project: projection, // Apply the projection to exclude unwanted fields
            },
        ];

        const user = await User.aggregate(pipeline);

        if (user.length === 0) {
            return []; // Return null if no user found
        }

        return user[0]; // Return the first (and expected) document from the aggregation result
    } catch (error) {
        console.error("Error fetching user:", error);
        // Handle errors appropriately, e.g., throw an error or log a message
        return null; // Indicate failure if desired
    }
}
