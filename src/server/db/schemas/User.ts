import mongoose = require("mongoose");
import IUser = require("../../../shared/IUser");

interface IUserModel extends IUser, mongoose.Document { }

var userSchema = new mongoose.Schema({
    name: String,
    picture: String,
    musicPaths: [String],
    history: [Number],
    favorites: [Number],
});

const User = mongoose.model<IUserModel>("User", userSchema);

export = User;