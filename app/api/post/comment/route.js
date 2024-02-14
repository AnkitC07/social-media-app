import { NextResponse } from 'next/server';
import Reply from '../../../../models/replyModel';


export const POST = async (request) => {
    try {
        const { postId, comment } = await request.json();
        const requestHeaders = new Headers(request.headers);
        const userId = requestHeaders.get("x-user-_id");
        const text = comment;

        const newComment = await Reply({
            text: text,
            user: userId,
            tweet: postId,
        })
        
        // Save the comment
        newComment.save().then((savedComment) => {
            // Update the Tweets replies array
            Tweet.findByIdAndUpdate(postId, { $push: { replies: savedComment._id } }).exec();
        });

        return NextResponse.json({
            message: `Comment added successfuly`,
            success: true,
            tweet: newComment,
        });

    } catch (error) {
        console.log("Error in comment api:".error);
        return NextResponse.json({ error: "Something went wrong in comment" }),{status:500};
    }
}