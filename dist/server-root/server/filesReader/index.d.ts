import { Music } from '../../shared/LoukiTypes';
import * as mm from 'music-metadata';
export interface MusicMetadata {
    music: Music;
    artists: Array<string>;
    album: string;
}
declare class FilesReader {
    getFieldInMetadata: (metadata: mm.IAudioMetadata, fieldName: Array<string>) => any;
    getMetadataAndAddToDB: (music: string, folder: string) => Promise<MusicMetadata>;
}
declare const _default: FilesReader;
export default _default;
