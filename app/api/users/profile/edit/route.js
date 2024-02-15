import { NextResponse } from "next/server";
import { connect } from "../../../../../dbConfig/dbConfig.js";
import User from "../../../../../models/userModel.js";
import { getTokenData } from "../../../../../helpers/getTokenData.js";
import { uploadImage } from "../../../../../cloudnary/uploadImage.js";

await connect();

export const PUT = async (request) => {
    try {
        const reqBody = await request.json();
        console.log("post edit api=>", reqBody);
        const { username, name, bio, avatar, banner } = reqBody;

        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get("id");
        let userId;
        if (id == "undefined") {
            userId = getTokenData(request);
        } else {
            userId = id;
        }
        const user = await User.findById(userId).select("-password");
        console.log("user", user);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // // If user found updating the data.
        if (username) {
            user.username = username;
        }
        if (name) {
            user.fullName = name;
        }
        if (bio) {
            user.bio = bio;
        }
        if (avatar) {
            user.avatar = await uploadImage(avatar, {
                folder: "Social-Media-App/Avatars",
                transformation: {
                    quality: "auto", // Automatically optimize image quality
                    aspect_ratio: 1, // Ensure square profile picture (optional)
                    width: 300, // Resize to 200px width (can be adjusted)
                    height: 300, // Resize to 200px height (can be adjusted)
                    gravity: "face", // Center the image within the resized frame
                    crop: "fill", // Fill the entire frame (or use 'fit' for letterboxing)
                },
            });
        }
        if (banner) {
            user.banner = await uploadImage(banner, {folder:"Social-Media-App/Banners"});
        }
        await user.save();

        return NextResponse.json({
            message: "User Updated",
            data: user,
        });
    } catch (error) {
        console.log(error);
        NextResponse.json(
            {
                error: error.message,
            },
            { status: 500 }
        );
    }
};
