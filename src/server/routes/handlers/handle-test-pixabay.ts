import { Request, Response } from 'express';
import { searchImages } from 'pixabay-api';

export const handleTestPixabay = (req: Request, res: Response): void => {
  searchImages(process.env.PIXABAY_API_KEY, 'piano')
    .then(results => {
      if (results && results.hits.length > 0) {
        res.status(200).json({ result: true });
      } else {
        res.status(200).json({ result: false });
      }
    })
    .catch(() => {
      res.status(200).json({ result: false });
    });
};
