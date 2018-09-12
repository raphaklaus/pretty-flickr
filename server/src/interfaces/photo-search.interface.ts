export interface PhotoSearch {
  photos: Photos
  stat: string
}

export interface Photos {
  page: number
  pages: string
  perpage: number
  total: string
  photo: Photo[]
}

export interface Photo {
  id: string
  owner: string
  secret: string
  server: string
  farm: number
  title: string
  ispublic: number
  isfriend: number
  isfamily: number
}
