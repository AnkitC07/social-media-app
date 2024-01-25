import { NextResponse } from "next/server";

export const POST = async (request) => {
    try {
        // const reqBody = await request.json();
        const formData = await request.formData()

        console.log(...formData)
         // Iterate over FormData entries
         for (const [name, value] of formData.entries()) {
            console.log(`${name}: ${value}`);
        }

        return NextResponse.json({
            message: `Post added successfuly`,
            success:true
         })

    } catch (error) {
        console.log("Something went wrong in post adding ", error);
        return NextResponse.json({
            error: error.message,
        },
        {status:500})
    }
}
