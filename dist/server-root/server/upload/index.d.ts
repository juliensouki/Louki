import { Request } from 'express';
interface MulterStorage {
    destination: (req: Request, file: any, cb: (e: Error | null, dest: string) => void) => void;
    filename: (req: Request, file: any, cb: (e: Error | null, dest: string) => void) => void;
}
export declare const playlistPictureStorage: MulterStorage;
export declare const profilePictureStorage: MulterStorage;
export {};
