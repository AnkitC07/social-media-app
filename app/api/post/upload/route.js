import { NextResponse } from "next/server";
import formidable from "formidable";
import cloudinary from "../../../../cloudnary/cldConfig.js";
import fileUpload from "express-fileupload";
import express from "express";

const app = express();
app.use(fileUpload())


// import { uploadImage } from "../../../../cloudnary/uploadImage.js";




export const POST = async (request) => {
    // const form = new formidable.IncomingForm();
    const form = await request.formData()
    console.log("form", form.get('files'))
    
    let files = [];
    for (const [name, value] of form.entries()) {
        files.push(value)
        console.log(`${name}: ${value}`);
    }

    try {
        // const { fields, files } = await new Promise(async(resolve, reject) => {
        //     form.parse(await request.formData(), (err, fields, files) => {
        //         if (err) reject(err);
        //         resolve({ fields, files });
        //     });
        // });

        const uploadedFiles = Object.values(files);
        
        const cloudinaryPromises = await uploadedFiles.map(async (file) => {
            console.log("-=-=-=-=-=-",file.toString('base64'))
            
            const fileStream =   Buffer.from(await file.arrayBuffer())
            const base64Data = fileStream.toString('base64');
            const finalData =  `data:video/mp4;base64,` + base64Data;
            // console.log("=>",fileStream.toString('base64'))
            const uploadMethod = file.size > 10 * 1024 * 1024 ? "upload_large" : "upload";
            // Configure your preferred transformation options here
            let options = {
                use_filename: true,
                unique_filename: false,
                overwrite: true,
                // folder: 'Social-Media-App/Posts',
                resource_type: "auto",
            }; // Customize according to your requirements

            if (uploadMethod === "upload_large") {
                return cloudinary.uploader[uploadMethod](finalData, options);
              } else {
                return cloudinary.uploader[uploadMethod](finalData, options);
              }
        });

        const cloudinaryResponses = await Promise.all(cloudinaryPromises);

        // Respond with uploaded file URLs or other relevant data
        const urls = cloudinaryResponses.map((response) => response.secure_url);
        return NextResponse.json({ urls });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            {
                error: error.message,
            },
            { status: 500 }
        );
    }
};

