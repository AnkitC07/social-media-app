import cloudinary from "./cldConfig.js";

let options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    // folder: 'Social-Media-App/Posts',
    resource_type: "auto",
};

export const uploadVideo = async (Path, option) => {
    // Use the uploaded file's name as the asset's public ID and
    // allow overwriting the asset with new versions
    options = {
        ...options,
        ...option,
    };

    try {
        // Upload the image
        const result = await cloudinary.uploader.upload_large(Path, options);
        console.log(result);
        return result.secure_url;
    } catch (error) {
        console.error(error);
        return new Error(error);
    }
};  