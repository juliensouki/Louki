declare class MusicLoader {
    private musicsQueue;
    private artistsQueue;
    private albumsQueue;
    pushInMusicsQueue: (musicId: string, folder: string) => void;
    processQueues: () => Promise<void>;
    private processMusicsQueue;
    private processArtistsQueue;
    private processAlbumsQueue;
}
declare const _default: MusicLoader;
export default _default;
