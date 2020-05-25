import { Router } from 'express';
import { MongoDBErrorRouter } from '../config/mongo-error-router';
import mongoose from 'mongoose';
import { logError } from '../logger';

class DatabaseHandler {
  private url: string = process.env.DATABASE_URL;

  connect = async (callbackOnError: (router: Router) => void) => {
    try {
      await mongoose.connect(this.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      });
    } catch (error) {
      logError(error);
      callbackOnError(MongoDBErrorRouter());
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

  updateDocument = async (model, id, update: any) => {
    return model
      .findOneAndUpdate({ __id: id }, update, { new: true })
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

  close = async () => {
    return await mongoose.connection.close();
  };
}

export default new DatabaseHandler();
