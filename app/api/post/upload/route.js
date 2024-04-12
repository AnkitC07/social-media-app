import { NextResponse } from "next/server";
import formidable from "formidable";
import cloudinary from "../../../../cloudnary/cldConfig.js";
import fileUpload from "express-fileupload";
import express from "express";
import Tweet from "../../../../models/tweetModel.js";
import Hashtag from "../../../../models/hashtagModel.js";
import User from "../../../../models/userModel.js";

const app = express();
app.use(fileUpload());

// import { uploadImage } from "../../../../cloudnary/uploadImage.js";

const uploadFiles = async (files) => {
    const uploadedFiles = Object.values(files);

    const cloudinaryPromises = await uploadedFiles.map(async (file) => {
        console.log("-=-=-=-=-=-", file.toString("base64"));

        const fileStream = Buffer.from(await file.arrayBuffer());
        console.log("fileStream",fileStream)
        const base64Data = fileStream.toString("base64");
        const finalData = `data:video/mp4;base64,` + base64Data;
        const uploadMethod = file.size > 10 * 1024 * 1024 ? "upload_large" : "upload";
        // Configure your preferred transformation options here
        let options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            folder: "Social-Media-App/Posts",
            resource_type: "auto",
        }; // Customize according to your requirements

        if (uploadMethod === "upload_large") {
            return cloudinary.uploader[uploadMethod](finalData, options);
        } else {
            return cloudinary.uploader[uploadMethod](finalData, options);
        }
    });

    const cloudinaryResponses = await Promise.all(cloudinaryPromises);

    // Respond with uploaded file URLs or other relevant data
    return cloudinaryResponses.map((response) => response.secure_url);
};

// Function to extract hashtags from a tweet text
function extractHashtags(tweetText) {
    const regex = /#(\w+)/g;
    const matches = tweetText.match(regex) || [];
    return matches.map((match) => match.slice(1)); // Remove the '#' symbol
}
export const POST = async (request) => {
    try {
        const requestHeaders = new Headers(request.headers);
        const userId = requestHeaders.get("x-user-_id");
        const form = await request.formData();
        const postText = form.get("postText");

        // Extracting the files
        let files = [];
        for (const [name, value] of form.entries()) {
            if (name == "files") files.push(value);
        }
        console.log(files, "files");

        // Respond with uploaded file URLs or other relevant data
        const secure_url = await uploadFiles(files);

        const tweet = new Tweet({
            text: postText,
            user: userId,
            images: secure_url || [],
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
       const tempTweet  = await tweet.populate('user', 'username avatar fullname')
        console.log("tweet user",tempTweet)
        return NextResponse.json({
            message: `Post added successfuly`,
            success: true,
            tweet: tweet,
        });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            {
                error: error.message,
            },
            { status: 500 }
        );
    }
};
