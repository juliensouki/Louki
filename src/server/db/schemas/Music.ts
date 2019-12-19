import mongoose, { Schema, Model } from "mongoose";
import IMusic from "../../../shared/IMusic";

interface IMusicModel extends IMusic, mongoose.Document { }

var musicSchema: Schema = new mongoose.Schema({
    title: String,
    artists: [Number],
    album: Number,
    duration: Number,
    path: String,
});

const Music: Model<IMusicModel> = mongoose.model<IMusicModel>("Music", musicSchema);

export = Music;