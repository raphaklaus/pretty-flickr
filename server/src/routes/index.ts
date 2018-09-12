import express from 'express'
import { FlickrService } from '../services/flickr.service'

export const routes = (app: express.Application) => {
  const flickrService = new FlickrService()
  app.get('/recent-photos', async (req: express.Request, res: express.Response) => {
    res.json(await flickrService.getPhotos(req.query.page))
  })
}
