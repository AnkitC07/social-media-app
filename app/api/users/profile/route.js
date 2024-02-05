import { NextResponse } from 'next/server'
import { connect } from "../../../../dbConfig/dbConfig.js";
import User from "../../../../models/userModel.js";
import { getTokenData } from '../../../../helpers/getTokenData.js';

connect();

export const GET = async (request)=>{
    try {
        const searchParams = request.nextUrl.searchParams
        const query = searchParams.get('id') 
        console.log(query,"query")
        let userId;
        if (query == "undefined") {
             userId = getTokenData(request);
        } else {
            userId = query
        }
        const user = await User.findOne({ _id: userId }).select("-password");
        return NextResponse.json({
            message: "User Found",
            data: user,
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}