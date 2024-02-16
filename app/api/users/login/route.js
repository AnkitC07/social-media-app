import { connect } from "../../../../dbConfig/dbConfig.js";
import User from "../../../../models/userModel.js";
import "../../../../models/tweetModel.js";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import createJWT from "../../../../jwt/create.js";

await connect();

export async function POST(request) {
    try {
        console.log("login");
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // Check if user exist
        const user = await User.findOne({ email }).populate("tweets");
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 400 });

        // Validate the password
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) return NextResponse.json({ error: "Invalid Password!" }, { status: 400 });
        // Create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
            password: password,
        };

        // Create token
        const token = createJWT(tokenData);

        const expirationTimeInHours = 10;
        const expirationTimeInSeconds = expirationTimeInHours * 60 * 60; // 1 hour = 60 minutes, 1 minute = 60 seconds

        delete tokenData.password;

        const userCopy = JSON.parse(JSON.stringify(user));
        delete userCopy.password;

        // Set cokkie
        const response = NextResponse.json({
            message: "Logged in successfully!",
            success: true,
            user: userCopy,
        });
        response.cookies.set("token", token, {
            httpOnly: true,
            maxAge: expirationTimeInSeconds,
        });

        return response;
    } catch (error) {
        console.log("Something went wrong!", error);
        return NextResponse.json(
            {
                error: error.message,
            },
            { status: 500 }
        );
    }
}
