import { NextResponse } from "next/server";
import User from "../../../models/userModel";
import { connect } from "../../../dbConfig/dbConfig.js"
import bcryptjs from "bcryptjs";

await connect()

export async function POST(request) {
    try {
        const reqBody = await request.json();
        // console.log("auth",reqBody.payload)
        const { payload: decoded } = reqBody;


        const user = await User.findOne({email: decoded.email });
        if (!user)
            return NextResponse.json({ error: "User not found" },{  status: 400 });
        
        // Validate the password
        const validPassword = await bcryptjs.compare(decoded.password, user.password);
        if (!validPassword)
            return NextResponse.json({ error: "Invalid Password!" },{ status: 400 });

        
        return NextResponse.json({
            message: "User found successfully!",
            success: true,
            user: user
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                error: error.message,
            },
            {
                status: 500,
            }
        );
    }
}
