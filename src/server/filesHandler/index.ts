import IMusic from "../../shared/IMusic";

import * as fs from "fs";
import * as mm from "music-metadata";
import Music from "../db/schemas/Music";


export default class filesHandler {
    private databaseHandler;
    private musicsAdded: number = 0;
    private musicsDeleted: number = 0;

    constructor(databaseHandler)
    {
        this.databaseHandler = databaseHandler;
    }

    updateNumberOfAddedSongs = (array: Array<Array<string>>): void => {
      array.forEach(row => {
          this.musicsAdded += row.length;
      });
    }

    deleteMusic = (path: string) => {
      this.musicsDeleted++;
      this.databaseHandler.deleteFromDocument(Music, "path", path);
    }

    getFieldInMetadata = (metadata: any, fieldName: Array<string>): any => {
        let currentlevel = metadata;
      
        for (let i = 0; i < fieldName.length; i++)
        {
          if (!currentlevel[fieldName[i]])
            return "";
          currentlevel = currentlevel[fieldName[i]];
        }
        return currentlevel;
      }
      
      getMetadataAndAddToDB = (music: string): void => {
        mm.parseFile(music)
        .then( metadata => {
          const musicObject: IMusic = {
            title: this.getFieldInMetadata(metadata, ["common", "title"]),
            artists: [0],
            album: 0,
            path: music,
            duration: this.getFieldInMetadata(metadata, ["format", "duration"]),
          };
          this.databaseHandler.addMusicToDatabase(musicObject);
        })
        .catch( err => {
          console.error(err.message);
        });
      }
      
      removePathFromArray = (arrayOfPaths: Array<Array<string>>, musicPath: string): Array<Array<string>> => {
        for (let i = 0; i < arrayOfPaths.length; i++)
        {
            const index = arrayOfPaths[i].indexOf(musicPath);
            if (index != -1)
            {
                arrayOfPaths[i].splice(index, 1);
                arrayOfPaths = arrayOfPaths.filter(function(row) {
                    return row.length > 0;
                });
                break ;
            }
        }
        return arrayOfPaths;
      }
      
    checkForUpdates = (arrayOfPaths: Array<Array<string>>): Array<Array<string>> => {
      this.databaseHandler.get("Musics").forEach(music => {
          if (!arrayOfPaths || !arrayOfPaths.some(row => row.includes(music.path)))
              this.deleteMusic(music.path);
          else 
          {
              arrayOfPaths = this.removePathFromArray(arrayOfPaths, music.path);
          }
      });
      this.updateNumberOfAddedSongs(arrayOfPaths);
      return arrayOfPaths;
    }

    logUpdatedDatabase = (): void => {
      console.log("Database udpated (" 
      + this.musicsDeleted + 
      " musics deleted and " 
      + this.musicsAdded 
      + " musics added)");    
    }
    
    loadAllMusic = (paths: Array<string>) => {
        const arrayOfPaths = [];
      
        paths.forEach(pathElement => {
          const arrayOfFiles = [];
          fs.readdirSync(pathElement, {withFileTypes: true})
          .filter((item) => {
            if (!item.isDirectory())
            {
              arrayOfFiles.push(pathElement + item.name);
            }
          });
          arrayOfPaths.push(arrayOfFiles);
        });
        const musicsToAdd: Array<Array<string>> = this.checkForUpdates(arrayOfPaths);
      
        for (let i = 0; i < musicsToAdd.length; i++)
        {
          musicsToAdd[i].forEach(music => {
            this.getMetadataAndAddToDB(music);
          });
        }
        this.logUpdatedDatabase();
    }
};
