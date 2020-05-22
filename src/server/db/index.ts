import mongoose from 'mongoose';
import { logError } from '../logger';

class DatabaseHandler {
  private url: string = process.env.DATABASE_URL;
  private Users: any = null;
  private Musics: any = null;

  connect = async () => {
    try {
      await mongoose.connect(this.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      });
    } catch (error) {
      logError(error);
    }
  };

  deleteFromDocument = (model, fieldName: string, fieldValue: string) => {
    return model
      .find({ [fieldName]: fieldValue })
      .deleteOne()
      .exec()
      .then(result => {
        return result;
      })
      .catch(err => {
        return err;
      });
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

  updateDocument = async (model, id, update: any) => {
    return model
      .findOneAndUpdate({ __id: id }, update)
      .exec()
      .then(result => {
        return result;
      })
      .catch(err => {
        return 'error occured';
      });
  };

  updateFieldInDocument = async (model, id, field: string, value: any) => {
    return model
      .findOneAndUpdate({ __id: id }, { name: 'Souki' })
      .exec()
      .then(result => {
        return result;
      })
      .catch(err => {
        return 'error occured';
      });
  };

  addToArray = async (model, uniqueField: string, uniqueValue: any, arrayToUpdate: string, valueToAdd: string) => {
    return model
      .findOneAndUpdate(
        {
          [uniqueField]: uniqueValue,
        },
        {
          $push: { [arrayToUpdate]: valueToAdd },
        },
        { new: true },
      )
      .exec();
  };

  removeFromArray = async (model, uniqueField: string, uniqueValue: any, arrayToUpdate: string, valueToAdd: string) => {
    return model
      .findOneAndUpdate(
        {
          [uniqueField]: uniqueValue,
        },
        {
          $pull: { [arrayToUpdate]: valueToAdd },
        },
        { new: true },
      )
      .exec();
  };

  findOneInDocument = async (model, field: string, value: any) => {
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

  findMany = async (model, field: string, array: Array<any>) => {
    return model
      .find({ [field]: { $in: array } })
      .exec()
      .then(result => {
        return result;
      })
      .catch(err => {
        return 'error occured';
      });
  };

  getCollectionContent = model => {
    return model
      .find({})
      .lean()
      .then(elements => {
        return elements;
      })
      .catch(err => {
        return err;
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
