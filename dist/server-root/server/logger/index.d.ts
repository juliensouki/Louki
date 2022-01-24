import mongoose from 'mongoose';
import { CustomError } from '../../shared/RoutesResponses';
declare const logger: any;
export declare const logError: (error: mongoose.Error | CustomError) => void;
export default logger;
