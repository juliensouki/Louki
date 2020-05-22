import { Request, Response } from 'express';
import { searchImages } from 'pixabay-api';
import { TestPixabay as TestPixabayResponse } from '../../../shared/RoutesResponses';

export const handleTestPixabay = (req: Request, res: Response): void => {
  searchImages(process.env.PIXABAY_API_KEY, 'piano')
    .then(images => {
      let result: TestPixabayResponse = false;
      if (images && images.hits.length > 0) {
        result = true;
      } else {
        result = false;
      }
      res.status(200).send(result);
    })
    .catch(() => {
      const response: TestPixabayResponse = false;
      res.status(200).send(response);
    });
};
