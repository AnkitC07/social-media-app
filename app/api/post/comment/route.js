import { NextResponse } from "next/server";
import Reply from "../../../../models/replyModel.js";
import Tweet from "../../../../models/tweetModel.js";
import User from "../../../../models/userModel.js";

0;
export async function POST(request) {
    try {
        const { postId, comment } = await request.json();
        console.log(postId, comment);
        const requestHeaders = new Headers(request.headers);
        const userId = requestHeaders.get("x-user-_id");
        const text = comment.text;

        const newComment = await Reply({
            text: text,
            user: userId,
            tweet: postId,
        });

        // Save the comment
        newComment.save().then((savedComment) => {
            // Update the Tweets replies array
            Tweet.findByIdAndUpdate(postId, { $push: { replies: savedComment._id } }).exec();
        });
        const user = await User.findById(userId).select("-password").exec();

        newComment.user = user;

        console.log();

        return NextResponse.json({
            message: "Comment added successfuly",
            success: true,
            reply: newComment,
        });
    } catch (error) {
        console.log("Error in comment api:".error);
        return NextResponse.json({ error: "Something went wrong in comment" }, { status: 500 });
    }
}

export async function GET(request) {
    try {

        const postId = request.nextUrl.searchParams.get("id");

        const comments = await Tweet.findById(postId).select("replies -_id ").populate({
            path: 'replies',
            select:'text createdAt',
            populate: {
                path: 'user',
                select: "avatar fullName username  "
            }
        })

        console.log('Comments Data=>',comments)

        if (!comments) {
            return NextResponse.json({ message: "No Comments found!" }, { status: 404 });
        } else {
            return NextResponse.json(comments);
        }


    } catch (error) {
        console.log("Error in comment getdata api:".error);
        return NextResponse.json({ error: "Something went wrong in comment getdata" }, { status: 500 });
    }
}
