import { NextResponse } from 'next/server'
import { connect } from "../../../../dbConfig/dbConfig.js";
import User from "../../../../models/userModel.js";
import { getTokenData } from '../../../../helpers/getTokenData.js';

connect();

export const GET = async (request)=>{
    try {
        const userId = getTokenData(request);
        const user = await User.findOne({ _id: userId }).select("-password");
        return NextResponse.json({
            message: "User Found",
            data: user,
        })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}