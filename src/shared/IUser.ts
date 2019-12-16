interface IUser {
    name: string,
    picture: string,
    musicPaths: Array<string>,
    history: Array<number>,
    favorites: Array<number>,
};

export = IUser;