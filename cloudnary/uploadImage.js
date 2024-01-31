import cloudinary from "./cldConfig.js"

export const uploadImage = async (imagePath) => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        folder: "Social-Media-App/Posts",
        resource_type:'auto'
        
    };

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath, options);                                      
      console.log(result);
      return result.secure_url;
    } catch (error) {
      console.error(error);
    }
};