import axios, { AxiosResponse } from 'axios'
import { head } from 'ramda'
import { ImageSizes } from '../../../core/enums/image-sizes.enum'
import { URLEndpoints } from '../../../core/enums/url-endpoints.enum'
import { PhotoInfo, URL } from '../../../core/interfaces/photo-info.interface'
import { PhotoSearch } from '../../../core/interfaces/photo-search.interface'
import { PhotoSizes } from '../../../core/interfaces/photo-sizes.interface'

export class FlickrService {
  async getPhotos(page = 1) {
    const response: AxiosResponse<PhotoSearch> = await axios(this.buildGetPhotosQueryString(page))
    const photosId = response.data.photos.photo.map((photo) => photo.id)

    return Promise.all(
      photosId.map(async (photoId) => {
        const photoInfo = await this.getPhotoInfo(photoId)

        return {
          images: await this.getPhotoSizes(photoId),
          link: (head(photoInfo.photo.urls.url) as URL)._content,
          owner: photoInfo.photo.owner.username
        }
      })
    )
  }

  private async getPhotoSizes(photoId: string) {
    const response: AxiosResponse<PhotoSizes> = await axios(this.buildGetSizesQueryString(photoId))

    return response.data.sizes.size.filter((size) => {
      return [ImageSizes.Medium640, ImageSizes.Large].includes(size.label)
    })
  }

  private async getPhotoInfo(photoId: string) {
    const response: AxiosResponse<PhotoInfo> = await axios(this.buildGetInfoQueryString(photoId))

    return response.data
  }

  private buildGetPhotosQueryString(currentPage: number, perPage = 32) {
    return `${URLEndpoints.FlickrAPI}?method=flickr.interestingness.getList` +
      `&api_key=${process.env.FLICKR_API_KEY}` +
      `&per_page=${perPage}&page=${currentPage}&format=json&nojsoncallback=1`
  }

  private buildGetSizesQueryString(photoId: string) {
    return `${URLEndpoints.FlickrAPI}?method=flickr.photos.getSizes` +
      `&api_key=${process.env.FLICKR_API_KEY}&photo_id=${photoId}&format=json&nojsoncallback=1`
  }

  private buildGetInfoQueryString(photoId: string) {
    return `${URLEndpoints.FlickrAPI}?method=flickr.photos.getInfo` +
      `&api_key=${process.env.FLICKR_API_KEY}&photo_id=${photoId}&format=json&nojsoncallback=1`
  }
}
