import axios from "axios";

async function followToggle(followeeId, action) {
    try {
        const response =  await axios.post('/api/users/followToggle', {
            followeeId,
            action,
        }); 

        const result = await response.data;
        console.log("Follow toggel result=>",result);

        // Return the result if you want to handle it in the calling component
        return result;
    } catch (error) {
        console.error('Error in followToggle:', error);

        // Return an error object if you want to handle errors in the calling component
        return { error: 'Internal Server Error' };
    }
}

export default followToggle;
