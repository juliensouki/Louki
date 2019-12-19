import User = require("./schemas/User");
import Music = require("./schemas/Music");
import IMusic = require("../../shared/IMusic");

var mongoose = require("mongoose");

class databaseHandler {
    private url: string = process.env.DATABASE_URL;
    private Users: any = null;
    private Musics: any = null;

    connect = async() =>
    {
        mongoose.connect(this.url, { useNewUrlParser: true, useUnifiedTopology: true }, async(err) => {
            if (err) throw err;
        });
    }
    
    getUsers = (callback: (paths: Array<string>) => void): void => {
        this.getCollectionContent(User)
        .then((value) => {
            this.Users = value;
            this.getMusics(callback);
        })          
        .catch((error) => {
            console.log("Failed to load users : " + error);
        });
    }

    getMusics = (callback: (paths: Array<string>) => void) => {
        this.getCollectionContent(Music)
        .then((value) => {
            this.Musics = value;
            callback(this.Users[0].musicPaths);
        })          
        .catch((error) => {
            console.log("Failed to load musics : " + error);
        });
    }

    addMusicToDatabase = (music: IMusic): void => {
        Music.create(music);
    }

    deleteMusic = (path: string) => {
        this.deleteFromDocument(Music, "path", path);
    }

    deleteFromDocument = (model, fieldName: string, fieldValue: string): void => {
        model.find({ [fieldName]: fieldValue }).deleteOne().exec();
    }

    getAllData = () => {
        //get Authors
        //get Albums
        //get Play
    } 

    getData = (model) => {
        this.getCollectionContent(model)
        .then((value) => {
            this[model.collection.collectionName] = value;
        })          
        .catch((error) => {
            console.log("Failed to load " + model.collection.collectionName + " : " + error);
        });
    }

    getCollectionContent = (model) => {
        return (new Promise(function(resolve, reject) {
            model.find({})
            .lean()
            .then((elements) => {
                resolve(elements);
                console.log("Succesfully loaded " + model.collection.collectionName);
            })
            .catch((err) => {
                reject(err);
            });
        }));
    }

    get = (item: "Musics" | "Users") => {
        return this[item];
    }
    
    close = async() => {
        return await mongoose.connection.close();
    }
}

export default new databaseHandler();