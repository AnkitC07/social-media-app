import { NextResponse } from "next/server";
import User from "../../../../models/userModel.js";

export const GET = async (request) => {
    try {
        const requestHeaders = new Headers(request.headers);
        const userId = requestHeaders.get("x-user-_id");

        const usersFollowedByYou = await User.findById(userId).select("following").exec();

        const users = await User.aggregate([
            {
                $match: {
                    _id: {
                        $ne: userId,
                    },
                },
            },
            {
                $sample: {
                    size: 10,
                },
            },
        ]);

        const filteredUsers = users.filter(user => !usersFollowedByYou.following.includes(user._id))
        const suggestedUsers = filteredUsers.slice(0, 4)
        suggestedUsers.forEach(user => user.password = null);
        
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
