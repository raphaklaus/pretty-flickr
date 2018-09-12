import { ImageSizes } from '../enums/image-sizes.enum'

export interface PhotoSizes {
  sizes: Sizes
  stat: string
}

export interface Sizes {
  canblog: number
  canprint: number
  candownload: number
  size: Size[]
}

export interface Size {
  label: ImageSizes
  width: number
  height: number
  source: string
  url: string
  media: string
}
