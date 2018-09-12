import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import { ModalClose } from './ModalClose'
import { ModalContainer } from './ModalContainer'
import { ModalContent } from './ModalContent'
import { ModalImage } from './ModalImage'

export default class Modal extends Component<{ src?: string, isOpened: boolean, handleClose: any}, {} > {
  render() {
    return <ModalContainer isOpened={this.props.isOpened}>
      <ModalClose onClick={this.props.handleClose}>
        <FontAwesomeIcon icon={faTimes} />
      </ModalClose>
      <ModalContent>
        <ModalImage src={this.props.src} />
        <p>Usuário blaaah</p>
      </ModalContent>
    </ModalContainer>
  }
}
