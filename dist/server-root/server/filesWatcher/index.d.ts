import { Router } from 'express';
declare class FilesWatcher {
    private watchersMap;
    private newMusicsLoading;
    private lastAddedMusicTime;
    private interval;
    private currentUser;
    loadData: (callback: (router: Router) => void) => Promise<void>;
    detectDeletedSong: (path: string) => void;
    unwatchFolder: (folder: string) => void;
    buildWatchArray: (folder: string) => Array<string>;
    howLongSinceLastMusicAdded: () => void;
    newMusicDetected: (path: string, folder: string) => void;
    setWatchersForFolder: (folder: string) => void;
    watchUserFolders: () => void;
}
declare const _default: FilesWatcher;
export default _default;
