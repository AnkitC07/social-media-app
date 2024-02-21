import { NextResponse } from "next/server";
import Tweet from "../../../../models/tweetModel.js";
import User from "../../../../models/userModel.js";
import Hashtag from "../../../../models/hashtagModel.js";
import { connect } from "../../../../dbConfig/dbConfig.js";

import { uploadImage } from "../../../../cloudnary/uploadImage.js";

// Function to extract hashtags from a tweet text
function extractHashtags(tweetText) {
    const regex = /#(\w+)/g;
    const matches = tweetText.match(regex) || [];
    return matches.map((match) => match.slice(1)); // Remove the '#' symbol
}
export const POST = async (request) => {
    try {
        const reqBody = await request.json();
        const requestHeaders = new Headers(request.headers);
        const userId = requestHeaders.get("x-user-_id");
        const { postText, img } = reqBody;

        // Upload the image
        const secure_url = await uploadImage(img);

        const tweet = new Tweet({
            text: postText,
            user: userId,
            images: [secure_url] || [],
            // Other fields...
            hashtags: extractHashtags(postText) || [],
        });

        // Save the tweet
        tweet.save().then((savedTweet) => {
            // Update the User's tweets array
            User.findByIdAndUpdate(userId, { $push: { tweets: savedTweet._id } }).exec();
            // Update the Hashtag collection
            savedTweet.hashtags.forEach((hashtag) => {
                Hashtag.findOneAndUpdate(
                    { hashtag: hashtag },
                    { $push: { tweets: savedTweet._id } },
                    { upsert: true }
                ).exec();
            });
        });


        return NextResponse.json({
            message: `Post added successfuly`,
            success: true,
            tweet: tweet,
        });
    } catch (error) {
        console.log("Something went wrong in post adding ", error);
        return NextResponse.json(
            {
                error: error.message,
            },
            { status: 500 }
        );
    }
};
