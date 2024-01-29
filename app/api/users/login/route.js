import { connect } from "../../../../dbConfig/dbConfig.js";
import User from "../../../../models/userModel.js";
import {  NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

await connect();

export async function POST(request) {

    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // Check if user exist
        const user = await User.findOne({ email });
        if (!user)
            return NextResponse.json({ error: "User not found" },{  status: 400 });
        
        // Validate the password
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword)
            return NextResponse.json({ error: "Invalid Password!" },{ status: 400 });
        // Create token data
        const tokenData = {
            id: user._id,
            username:user.username,
            email: user.email,
        }

        // Create token 
        const token = await jwt.sign(tokenData, process.env.JWT_TOKEN_SECRET);

        const expirationTimeInHours = 10;
        const expirationTimeInSeconds = expirationTimeInHours * 60 * 60; // 1 hour = 60 minutes, 1 minute = 60 seconds


        // Set cokkie
        const response = NextResponse.json({
            message: "Logged in successfully!",
            success:true
        })

        response.cookies.set("token", token, {
            httpOnly: true,
            maxAge: expirationTimeInSeconds

        })
        return response;
        
    } catch (error) {
        console.log("Something went wrong!", error)
        return NextResponse.json({
                error:error.message
            },
            { status: 500 }
        )
    }

}