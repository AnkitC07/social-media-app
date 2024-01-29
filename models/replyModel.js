import mongoose from "mongoose"

const replySchema = new mongoose.Schema({
    text: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tweet: { type: mongoose.Schema.Types.ObjectId, ref: 'Tweet', required: true },
    createdAt: { type: Date, default: Date.now },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  });
  
const Reply = mongoose.models.replys || mongoose.model("replys", replySchema);

export default Reply;