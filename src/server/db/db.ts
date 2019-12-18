import User = require("./schemas/User");
import Music = require("./schemas/Music");

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
    
    getUsers = (callback: (arg: Array<string>) => void) => {
        this.getCollectionContent(User)
        .then((value) => {
            this.Users = value;
            callback(this.Users[0].musicPaths);
        })          
        .catch((error) => {
            console.log("Failed to load users : " + error);
        });
    }

    getAllData = () => {
        this.getData(Music);
        //get Authors
        //get Albums
        //get Musics
        //get Playlists
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
                console.log("Succesfully loaded " + model.collection.collectionName);
                resolve(elements);
            })
            .catch((err) => {
                reject(err);
            });
    }));
    }
    
    get = (field: string) =>
    {
        return this[field];
    }
    
    collectionExists = (collectionName: string): boolean =>
    {
        return mongoose.getCollection(collectionName).exists();
    }

    close = async() => {
        return await mongoose.connection.close();
    }
}

export default new databaseHandler();