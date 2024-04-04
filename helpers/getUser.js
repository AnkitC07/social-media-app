import { connect } from "../dbConfig/dbConfig";
import User from "../models/userModel";
connect()
export const getUser = async (id) => {
    try {
        const user = await User.findOne( { _id: id }).select("username");
        console.log(user,id);
        return user;
    } catch (error) {
        console.log("Error in getuser", error);
        return {};
    }
};
