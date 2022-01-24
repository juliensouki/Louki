import { Router } from 'express';
declare class DatabaseHandler {
    private url;
    connect: (callbackOnError: (router: Router) => void) => Promise<void>;
    deleteFromDocument: (model: any, fieldName: string, fieldValue: string) => any;
    updateDocument: (model: any, id: any, update: any) => Promise<any>;
    updateFieldInDocument: (model: any, id: any, field: string, value: any) => Promise<any>;
    addToArray: (model: any, uniqueField: string, uniqueValue: any, arrayToUpdate: string, valueToAdd: string) => Promise<any>;
    removeFromArray: (model: any, uniqueField: string, uniqueValue: any, arrayToUpdate: string, valueToAdd: string) => Promise<any>;
    findOneInDocument: (model: any, field: string, value: any) => Promise<any>;
    findMany: (model: any, field: string, array: Array<any>) => Promise<any>;
    getCollectionContent: (model: any) => any;
    close: () => Promise<void>;
}
declare const _default: DatabaseHandler;
export default _default;
