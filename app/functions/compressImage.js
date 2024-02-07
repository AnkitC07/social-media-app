
export async function compressImage(blobImg,base64Img, initialPercent = 95) {
    const imgSize = checkLength(base64Img);
    if (imgSize <= 10) {
        // Image already small enough, return directly
        return base64Img;
    }

    return _compressAndCheck(blobImg, initialPercent);
}

async function _compressAndCheck(blobImg, percent) {
    const dataUrl = await compressOnce(blobImg, percent);
    const compressedSize = checkLength(dataUrl);
    console.log("Size=>", compressedSize);

    if (compressedSize <= 10) {
        return dataUrl;
    } else {
        // Reduce compression quality and try again
        return _compressAndCheck(blobImg, percent - 1); // Adjust decrement as needed
    }
}

async function compressOnce(blobImg, percent) {
    const bitmap = await createImageBitmap(blobImg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    ctx.drawImage(bitmap, 0, 0);
    return canvas.toDataURL("image/jpeg", percent / 100);
}

const checkLength = (img) => {
    const buffer = Buffer.from(img.substring(img.indexOf(",") + 1), "base64");
    // console.log("Byte length: " + buffer.length);
    console.log("MB: " + buffer.length / 1e6);
    return (buffer.length / 1e6).toFixed(2);
};
