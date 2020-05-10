import { Request, Response } from 'express';
import { searchImages } from 'pixabay-api';

export const handlePixabaySearch = (req: Request, res: Response): void => {
  const search: string = req.query.search as string;
  searchImages(process.env.PIXABAY_API_KEY, search).then(results => {
    const images: Array<string> = [];
    for (let i = 0; i < results.hits.length; i++) {
      images.push(results.hits[i].webformatURL);
    }
    res.send(images);
  });
};
