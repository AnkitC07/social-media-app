import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: [true, "Please provide a username"], unique: true },
    email: { type: String, required: [true, "Please provide a email"], unique: true },
    password: { type: String, required: [true, "Please provide a password"] },
    isVerified: { type: Boolean, default: false },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    fullName: { type: String, required: true },
    bio: { type: String },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/deyq54d8b/image/upload/v1707136917/Social-Media-App/default-profile.jpg",
    }, // URL to user's profile picture
    banner: {
        type: String,
        default: "https://res.cloudinary.com/deyq54d8b/image/upload/v1707136917/Social-Media-App/default-banner.jpg",
    }, // URL to user's banner picture
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    tweets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tweet" }],
});
const User = mongoose?.models?.users || mongoose.model("users", userSchema);

export default User;
