import { NextResponse } from "next/server";
import fs from 'fs'
// import '../../../../cloudnary/cldConfig.js'
import { uploadImage } from "../../../../cloudnary/uploadImage.js"
import FileReader from "filereader"
// const toBase64 = file => new Promise((resolve, reject) => {



    
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     // `onload` as listener
//     reader.addEventListener('load', function (ev) {
//         resolve(reader.result)
//     });
//     // reader.onload = () => resolve(reader.result);
//     reader.addEventListener('error', function (ev) {
//         reject
//     });
//     // reader.onerror = reject;
// });



export const POST = async (request) => {
    try {

        
        // const reqBody = await request.json();
        const formData = await request.formData()
        let image;

        console.log(...formData)
         // Iterate over FormData entries
        for (const [name, value] of formData.entries()) {
            if (name == "files") {
                //  image = await toBase64(value)
                // const image = fs.readFileSync(value);
                
             }
            // console.log(`${name}: ${value}`);
        }
        
        console.log(image)
        // Upload the image
        // const secure_url = await uploadImage("https://static.zerochan.net/Monkey.D..Luffy.full.3186340.jpg");



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
