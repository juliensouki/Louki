import mongoose = require("mongoose");
import IMusic = require("../../../shared/IMusic");

interface IMusicModel extends IMusic, mongoose.Document { }

var musicSchema = new mongoose.Schema({
    title: String,
    artists: [Number],
    album: Number,
    duration: Number,
    path: String,
});

const Music = mongoose.model<IMusicModel>("Music", musicSchema);

export = Music;