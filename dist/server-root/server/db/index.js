"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongo_error_router_1 = require("../config/mongo-error-router");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const logger_1 = require("../logger");
class DatabaseHandler {
    constructor() {
        this.url = process.env.DATABASE_URL;
        this.connect = (callbackOnError) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.connect(this.url, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useFindAndModify: false,
                    useCreateIndex: true,
                });
            }
            catch (error) {
                logger_1.logError(error);
                callbackOnError(mongo_error_router_1.MongoDBErrorRouter());
            }
        });
        this.deleteFromDocument = (model, fieldName, fieldValue) => {
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
        this.updateDocument = (model, id, update) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return model
                .findOneAndUpdate({ __id: id }, update, { new: true })
                .exec()
                .then(result => {
                return result;
            })
                .catch(err => {
                return 'error occured';
            });
        });
        this.updateFieldInDocument = (model, id, field, value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return model
                .findOneAndUpdate({ __id: id }, { name: 'Souki' })
                .exec()
                .then(result => {
                return result;
            })
                .catch(err => {
                return 'error occured';
            });
        });
        this.addToArray = (model, uniqueField, uniqueValue, arrayToUpdate, valueToAdd) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return model
                .findOneAndUpdate({
                [uniqueField]: uniqueValue,
            }, {
                $push: { [arrayToUpdate]: valueToAdd },
            }, { new: true })
                .exec();
        });
        this.removeFromArray = (model, uniqueField, uniqueValue, arrayToUpdate, valueToAdd) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return model
                .findOneAndUpdate({
                [uniqueField]: uniqueValue,
            }, {
                $pull: { [arrayToUpdate]: valueToAdd },
            }, { new: true })
                .exec();
        });
        this.findOneInDocument = (model, field, value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return model
                .find({ [field]: value })
                .exec()
                .then(result => {
                return result;
            })
                .catch(err => {
                return 'error occured';
            });
        });
        this.findMany = (model, field, array) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return model
                .find({ [field]: { $in: array } })
                .exec()
                .then(result => {
                return result;
            })
                .catch(err => {
                return 'error occured';
            });
        });
        this.getCollectionContent = model => {
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
        this.close = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield mongoose_1.default.connection.close();
        });
    }
}
exports.default = new DatabaseHandler();
//# sourceMappingURL=index.js.map