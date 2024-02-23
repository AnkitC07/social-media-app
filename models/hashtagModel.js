import mongoose from "mongoose"

const hashtagSchema = new mongoose.Schema({
    hashtag: { type: String, required: true, unique: true },
    tweets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tweets' }],
});
  
const Hashtag = mongoose.models.hashtags || mongoose.model("hashtags", hashtagSchema);  
export default Hashtag;