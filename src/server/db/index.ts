import mongoose from 'mongoose';

class DatabaseHandler {
  private url: string = process.env.DATABASE_URL;
  private Users: any = null;
  private Musics: any = null;

  connect = async () => {
    mongoose.connect(
      this.url,
      { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
      async err => {
        if (err) throw err;
      },
    );
  };

  deleteFromDocument = (model, fieldName: string, fieldValue: string): void => {
    model
      .find({ [fieldName]: fieldValue })
      .deleteOne()
      .exec();
  };

  getData = model => {
    this.getCollectionContent(model)
      .then(value => {
        this[model.collection.collectionName] = value;
      })
      .catch(error => {
        console.log('Failed to load ' + model.collection.collectionName + ' : ' + error);
      });
  };

  updateDocument = async (model, _id, fieldName: string, newData) => {
    return model
      .findOneAndUpdate({ _id: _id }, { [fieldName]: newData })
      .exec()
      .then(result => {
        return result;
      })
      .catch(err => {
        return 'error occured';
      });
  };

  findOneInDocument = async (model, field: string, value: string) => {
    return model
      .find({ [field]: value })
      .exec()
      .then(result => {
        return result;
      })
      .catch(err => {
        return 'error occured';
      });
  };

  getCollectionContent = model => {
    return new Promise(function(resolve, reject) {
      model
        .find({})
        .lean()
        .then(elements => {
          resolve(elements);
          console.log('Succesfully loaded ' + model.collection.collectionName);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  get = (item: 'Musics' | 'Users') => {
    return this[item];
  };

  close = async () => {
    return await mongoose.connection.close();
  };
}

export default new DatabaseHandler();
