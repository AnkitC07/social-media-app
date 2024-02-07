import cloudinary from "./cldConfig.js";

let options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    // folder: 'Social-Media-App/Posts',
    resource_type: "auto",
};

export const uploadImage = async (imagePath, option) => {
    // Use the uploaded file's name as the asset's public ID and
    // allow overwriting the asset with new versions
    options = {
        ...options,
        ...option,
    };

    try {
        // Upload the image
        const result = await cloudinary.uploader.upload(imagePath, options);
        console.log(result);
        return result.secure_url;
    } catch (error) {
        console.error(error);
        return new Error(error);
    }
};
// export const uploadImageStream = async (imagePath,folder='Social-Media-App/Posts') => {

//     // Use the uploaded file's name as the asset's public ID and
//     // allow overwriting the asset with new versions
//     options.folder =folder
//     options.stream =true;

//     try {
//       // Upload the image
//       const result = await cloudinary.uploader.upload_stream(imagePath, options);
//       console.log(result);
//       return result.secure_url;
//     } catch (error) {
//       console.error(error);
//       return new Error(error)
//     }
// };
