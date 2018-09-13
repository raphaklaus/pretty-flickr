import { Size } from './photo-sizes.interface'

export interface PhotoResult {
  images: Size[]
  link: string,
  owner: string
}
