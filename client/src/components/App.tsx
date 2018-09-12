import axios, { AxiosResponse } from 'axios'
import { ascend, prop, sortWith } from 'ramda'
import React, { Component } from 'react'
import 'typeface-roboto'
import { ImageSizes } from '../../../server/src/enums/image-sizes.enum'
import { PhotoResult } from '../../../server/src/interfaces/photo-result.interface'
import '../style'
import { Heading } from './Heading'
import { Image } from './Image'
import { ImagesContainer } from './ImagesContainer'
import Modal from './Modal'

export default class App extends Component<{}, {
    images: Array<{ urls: { thumbnail: string, original: string }, ratio: number}>,
    modalImage?: string,
    isOpened: boolean
  }> {
  constructor(props: any) {
    super(props)

    this.state = {
      images: [],
      isOpened: false
    }
  }

  async componentWillMount() {
    const response: AxiosResponse<PhotoResult[]> = await axios('/recent-photos?page=1')

    // tslint:disable-next-line:max-line-length
    const orderByWidth = sortWith<{ urls: { thumbnail: string, original: string }, ratio: number }>([ascend(prop<string>('ratio'))])

    this.setState({
      images: orderByWidth(response.data.map((photo) => {
        const originalPhoto = photo.images.find((x) => x.label === ImageSizes.Large)
        const thumbnailPhoto = photo.images.find((x) => x.label === ImageSizes.Medium640)

        return {
          ratio: thumbnailPhoto!.width / thumbnailPhoto!.height,
          urls: {
            original: originalPhoto!.source,
            thumbnail: thumbnailPhoto!.source
          }
        }
      }))
    })
  }

  handleShowModal(url: string) {
    return () => {
      const body = document.querySelector('body')

      if (body) {
        body.setAttribute('class', 'no-scroll')
      }

      this.setState({
        isOpened: true,
        modalImage: url
      })
    }
  }

  handleCloseModal() {
    return () => {
      const body = document.querySelector('body')

      if (body) {
        body.setAttribute('class', '')
      }

      this.setState({
        isOpened: false
      })
    }
  }

  render() {
    const renderThumbnails = () => {
      return this.state.images.map((images, index) => {
        return <Image key={index} src={images.urls.thumbnail} onClick={this.handleShowModal(images.urls.original)}/>
      })
    }

    return (
      <div>
        <Heading>
          Pretty Flickr
        </Heading>
        <ImagesContainer>
          {renderThumbnails()}
        </ImagesContainer>
        <Modal isOpened={this.state.isOpened} handleClose={this.handleCloseModal()} src={this.state.modalImage} />
      </div>
    )
  }
}
