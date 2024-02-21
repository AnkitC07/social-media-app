import { NextResponse } from "next/server";
import User from "../../../../models/userModel.js";
import mongoose from "mongoose";

export const GET = async (request) => {
    try {
        const requestHeaders = new Headers(request.headers);
        const userId = requestHeaders.get("x-user-_id");

        const usersFollowedByYou = await User.findById(userId).select("following").exec();

        const users = await User.aggregate([
            {
                $match: {
                    _id: {
                        $ne: new mongoose.Types.ObjectId(userId),
                    },
                },
            },
            {
                $sample: {
                    size: 10,
                },
            },
        ]);
console.log("->",userId)
        const filteredUsers = users.filter(user => !usersFollowedByYou.following.includes(user._id))
        const suggestedUsers = filteredUsers.slice(0, 4)
        suggestedUsers.forEach(user => user.password = null);
        console.log("suggseted users",suggestedUsers)
        
        return NextResponse.json({
            success: true,
            suggestedUsers,
        });
    } catch (error) {
        console.log("Something went wrong in suggested api: ", error);
        return NextResponse.json(
            {
                error: error.message,
            },
            {
                status: 500,
            }
        );
    }
    return NextResponse.next();
};
