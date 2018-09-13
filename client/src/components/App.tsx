import axios, { AxiosResponse } from 'axios'
import { ascend, prop, sortWith } from 'ramda'
import React, { Component } from 'react'
import 'typeface-roboto'
import { ImageSizes } from '../../../core/enums/image-sizes.enum'
import { PhotoGallery } from '../../../core/interfaces/photo-gallery.interface'
import { PhotoResult } from '../../../core/interfaces/photo-result.interface'
import '../style'
import { Heading } from './Heading'
import { Image } from './Image'
import { ImagesContainer } from './ImagesContainer'
import Modal from './Modal'

export default class App extends Component<{}, {
    images: PhotoGallery[],
    selectedImage?: PhotoGallery
    modalImage?: string,
    isOpened: boolean,
    userData?: any
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
    const orderByWidth = sortWith<PhotoGallery>([ascend(prop<string>('ratio'))])

    this.setState({
      images: orderByWidth(response.data.map((photo) => {
        const originalPhoto = photo.images.find((x) => x.label === ImageSizes.Large)
        const thumbnailPhoto = photo.images.find((x) => x.label === ImageSizes.Medium640)

        return {
          link: photo.link,
          owner: photo.owner,
          ratio: thumbnailPhoto!.width / thumbnailPhoto!.height,
          urls: {
            original: originalPhoto!.source,
            thumbnail: thumbnailPhoto!.source
          }
        }
      }))
    })
  }

  handleShowModal(selectedImage: PhotoGallery) {
    return () => {
      const body = document.querySelector('body')

      if (body) {
        body.setAttribute('class', 'no-scroll')
      }

      this.setState({
        isOpened: true,
        selectedImage
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
      return this.state.images.map((image, index) => {
        return <Image key={index} src={image.urls.thumbnail} onClick={this.handleShowModal(image)}/>
      })
    }

    const renderModal = () => {
      if (this.state.selectedImage) {
        return <Modal
          isOpened={this.state.isOpened}
          handleClose={this.handleCloseModal()}
          data={this.state.selectedImage}
        />
      }
    }

    return (
      <div>
        <Heading>
          Pretty Flickr
        </Heading>
        <ImagesContainer>
          {renderThumbnails()}
        </ImagesContainer>
        {renderModal()}
      </div>
    )
  }
}
