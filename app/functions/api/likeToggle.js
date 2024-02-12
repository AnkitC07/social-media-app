import axios from "axios";

async function likeToggle(postId, action) {
    try {
        const response =  await axios.post('/api/post/likeToggle', {
            postId,
            action,
        }); 

        const result = await response.data;
        console.log(result);
        // Return the result if you want to handle it in the calling component
        return result;
    } catch (error) {
        console.error('Error in likeToggle:', error);
        // Return an error object if you want to handle errors in the calling component
        return { error: 'Internal Server Error' };
    }
}

export default likeToggle;