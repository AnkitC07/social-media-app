export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import User from "../../../../models/userModel.js";
import mongoose from "mongoose";

export const GET = async (request) => {
    try {
        const requestHeaders = new Headers(request.headers);
        const userId = requestHeaders.get("x-user-_id");

        const usersFollowedByYou = await User.findById(userId).select("following").exec();
        const projection = {
            _id: 1, // Include the _id field for clarity
            username: 1,
            fullName: 1,
            avatar: 1,
            // following: 1,
        };

        // const users = await User.aggregate([
        //     {
        //         $match: {
        //             _id: {
        //                 $ne: new mongoose.Types.ObjectId(userId),
        //             },
        //         },
        //     },
        //     {
        //         $project: projection,
        //     },
        //     {
        //         $sample: {
        //             size: 10,
        //         },
        //     },
        // ]);
        const users = await User.aggregate([
            {
                $match: {
                    _id: {
                        $nin: [
                            ...usersFollowedByYou?.following?.map((id) => new mongoose.Types.ObjectId(id)),
                            new mongoose.Types.ObjectId(userId),
                        ],
                    },
                },
            },
            {
                $project: projection,
            },
            {
                $sample: {
                    size: 10,
                },
            },
        ]);

        // const filteredUsers = users.filter((user) => !usersFollowedByYou.following.includes(user._id));
        // const suggestedUsers = filteredUsers.slice(0, 4);
        // suggestedUsers.forEach((user) => delete user.password);
        return NextResponse.json({
            success: true,
            suggestedUsers: users,
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
};
