import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import { PhotoGallery } from '../../../core/interfaces/photo-gallery.interface'
import { ModalClose } from './ModalClose'
import { ModalContainer } from './ModalContainer'
import { ModalContent } from './ModalContent'
import { ModalImage } from './ModalImage'

export default class Modal extends Component<{ isOpened: boolean, handleClose: any,
  data: PhotoGallery}, {} > {
  render() {
    return <ModalContainer isOpened={this.props.isOpened}>
      <ModalClose onClick={this.props.handleClose}>
        <FontAwesomeIcon icon={faTimes} />
      </ModalClose>
      <ModalContent>
        <ModalImage src={this.props.data.urls.original} />
        <a href={this.props.data.link}>{this.props.data.owner}</a>
      </ModalContent>
    </ModalContainer>
  }
}
