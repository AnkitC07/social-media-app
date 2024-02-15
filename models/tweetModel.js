import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
    text: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    createdAt: { type: Date, default: Date.now },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    retweets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tweets' }],
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'replys' }],
    hashtags: [{ type: String }], // Array to store hashtags
    images: [{ type: String }], // Array to store image URLs
    videos: [{ type: String }], // Array to store video URLs
});
  
const Tweet = mongoose.models.tweets || mongoose.model("tweets", tweetSchema);

export default Tweet;