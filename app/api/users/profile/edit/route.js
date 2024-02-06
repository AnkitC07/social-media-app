import { NextResponse } from "next/server";
import { connect } from "../../../../../dbConfig/dbConfig.js";
import User from "../../../../../models/userModel.js";
import { getTokenData } from "../../../../../helpers/getTokenData.js";
// import imageMin from "imagemin";
// import sharp from 'sharp';
// import jpegtran from 'jpegtran'; // Optional, if you prefer standalone JPEG optimization
// import gifsicle from 'gifsicle'; // Optional, if you prefer standalone GIF optimization
// import zlib from 'zlib';
// import { uploadImage, uploadImageStream } from "../../../../../cloudnary/uploadImage.js";
// import {compressImage} from "../../../../functions/compressImage.js";

await connect();

// Recursive function to compress and resize the image until it meets the size requirement
// async function compressAndResize(buffer, targetFileSize, targetQuality) {
//     let compressedBuffer = buffer;

//     // Recursive function
//     async function recursiveCompression() {
//         compressedBuffer = await imageMin(compressedBuffer, { quality: targetQuality });
//         if (compressedBuffer.length > targetFileSize) {
//             return recursiveCompression(); // Continue compressing recursively
//         } else {
//             return compressedBuffer; // Return the final compressed image
//         }
//     }

//     return recursiveCompression();
// }

// const getImageLength = async (img, folder) => {
//     const buffer = Buffer.from(img.substring(img.indexOf(",") + 1), "base64");

//     console.log("Byte length: " + buffer.length);
//     console.log("MB: " + buffer.length / 1e6);

//     const imgSize = (buffer.length / 1e6).toFixed(2);

//     if (imgSize > 10) {
//         // Recursively compress the image until it meets the size requirement
//         compressAndResize(buffer, 10 * 1024 * 1024, 80)
//             .then(async (finalBuffer) => {
//                 console.log(finalBuffer.length);
//                 // Upload the final compressed image to Cloudinary
//                 return await uploadImageStream(finalBuffer, folder);
//             })
//             .catch((error) => {
//                 console.error("Error compressing image:", error);
//                 return new Error(error);
//             });
//     } else {
//         // Upload the original image to Cloudinary
//         return await uploadImageStream(buffer, folder);
//     }
// };

// async function compressBase64Image(rawBuffer) {
//     let compressAttempts = 0;
//     const targetSize = 7.5 * 1024 * 1024; // Aim for around 7.5 MB

//     while (rawBuffer.length > targetSize && compressAttempts < 5) {
//         compressAttempts++;

//         // Try WEBP with quality reduction:
//         let tempBuffer = await sharp(rawBuffer)
//             .webp({ quality: Math.max(50 - compressAttempts * 5, 20) })
//             .toBuffer();

//         if (tempBuffer.length < targetSize) {
//             rawBuffer = tempBuffer;
//             break;
//         }

//         // Try JPEG with quality reduction:
//         tempBuffer = await sharp(rawBuffer)
//             .jpeg({ quality: Math.max(80 - compressAttempts * 5, 50) })
//             .toBuffer();

//         if (tempBuffer.length < targetSize) {
//             rawBuffer = tempBuffer;
//             break;
//         }

//         // Apply lossless optimizations (Gifsicle, Jpegtran):
//         if (rawBuffer.type === "gif") {
//             tempBuffer = await gifsicle(rawBuffer);
//         } else if (rawBuffer.type === "jpeg") {
//             tempBuffer = await jpegtran(rawBuffer);
//         }

//         if (tempBuffer.length < targetSize) {
//             rawBuffer = tempBuffer;
//             break;
//         }

//         // Aggressive lossy compression (last resort):
//         tempBuffer = await zlib.gzip(rawBuffer, { level: 9 }); // Maximum compression

//         if (tempBuffer.length < targetSize) {
//             rawBuffer = tempBuffer;
//             break;
//         }

//         // Stop after multiple failed attempts:
//         console.warn(`Unable to compress below ${targetSize} bytes after ${compressAttempts} attempts.`);
//         break;
//     }

//     return rawBuffer;
// }

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
        console.log("user",user)
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
        // if (avatar) {
        //     const img = await getImageLength(avatar, "Avatars");
        //     console.log("img 1", img);

        //     // user.avatar = await uploadImage(avatar, "Social-Media-App/Avatars");
        // }
        // if (banner) {
            // const base64Data = banner; // Your Base64 image data
            // const rawBuffer = Buffer.from(base64Data.split(",")[1], "base64");

            // const compressedBuffer = await compressBase64Image(rawBuffer);
            // const compressedBase64 = compressedBuffer.toString("base64");

            // if (compressedBuffer.length <= 10) {
            //     console.log('Image compressed successfully:', compressedBase64);
            // } else {
            //     console.warn('Compression failed to reach target size.');
            // }

            // const img = await getImageLength(banner, "Banners");
            // console.log("img 2", img);
            // user.banner = await uploadImage(banner, "Social-Media-App/Banners");
        // }
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
