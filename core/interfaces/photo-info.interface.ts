export interface PhotoInfo {
  photo: Photo
  stat: string
}

export interface Photo {
  id: string
  owner: Owner
  title: Comments
  description: Comments
  visibility: Visibility
  dates: Dates
  views: string
  editability: Editability
  publiceditability: Editability
  usage: Usage
  comments: Comments
  notes: Notes
  people: People
  tags: Tags
  urls: Urls
  media: string
}

export interface Comments {
  _content: string
}

export interface Dates {
  posted: string
  taken: string
  takengranularity: number
  takenunknown: number
  lastupdate: string
}

export interface Editability {
  cancomment: number
  canaddmeta: number
}

export interface Notes {
  note: any[]
}

export interface Owner {
  nsid: string
  username: string
  realname: string
  location: string
  iconserver: string
  iconfarm: number
  path_alias: string
}

export interface People {
  haspeople: number
}

export interface Tags {
  tag: any[]
}

export interface Urls {
  url: URL[]
}

export interface URL {
  type: string
  _content: string
}

export interface Usage {
  candownload: number
  canblog: number
  canprint: number
  canshare: number
}

export interface Visibility {
  ispublic: number
  isfriend: number
  isfamily: number
}
