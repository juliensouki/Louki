import User = require("./schemas/User");

var mongoose = require("mongoose");

class databaseHandler {
    private url: string = process.env.DATABASE_URL;
    private users: any = null;
    
    async connect() 
    {
        const getCollectionContent = this.getCollectionContent;

        mongoose.connect(this.url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
            if (err) throw err;
            console.log("Connected to database");
            getCollectionContent("users");
        });
    }

    getCollectionContent = (collectionName: string) =>
    {
        console.log("Loading " + collectionName + "...");
        mongoose.connection.db.listCollections({name: collectionName})
            .next((err, results) => {
                if (results) {
                    User.find({}, (err, results) => {
                        this[collectionName] =  results;
                        console.log("Successfully loaded" + collectionName);
                    });
                }
        });
    }

    get = (field: string) =>
    {
        return this[field];
    }
    
    collectionExists = (collectionName: string): boolean =>
    {
        return mongoose.getCollection(collectionName).exists();
    }

    async close() {
        return await mongoose.connection.close();
    }
}

export default new databaseHandler();