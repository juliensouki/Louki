import { Request, Response } from 'express';
import { searchImages } from 'pixabay-api';
import { PixabaySearch as PixabaySearchResponse, CustomError } from '../../../shared/RoutesResponses';
import { logError } from '../../logger';

export const handlePixabaySearch = (req: Request, res: Response): void => {
  const search: string = req.query.search as string;

  searchImages(process.env.PIXABAY_API_KEY, search).then(
    results => {
      const images: PixabaySearchResponse = [];
      for (let i = 0; i < results.hits.length; i++) {
        images.push(results.hits[i].webformatURL);
      }
      res.status(200).send(images);
    },
    pixabayError => {
      const response: CustomError = {
        name: `Pixabay search error`,
        message: pixabayError.message,
      };
      logError(response);
      res.status(500).send(response);
    },
  );
};
