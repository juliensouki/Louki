import { Request, Response } from 'express';
import { searchImages } from 'pixabay-api';
import { PixabaySearchResponse } from '../../../shared/RoutesResponses';

export const handlePixabaySearch = (req: Request, res: Response): void => {
  const search: string = req.query.search as string;

  searchImages(process.env.PIXABAY_API_KEY, search).then(results => {
    const images: PixabaySearchResponse = [];
    for (let i = 0; i < results.hits.length; i++) {
      images.push(results.hits[i].webformatURL);
    }
    res.status(200).send(images);
  });
};
