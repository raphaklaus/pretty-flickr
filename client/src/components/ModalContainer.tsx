import styled, { injectGlobal } from 'styled-components'

export const ModalContainer = styled.div`
  display: ${(props: {isOpened: boolean}) => props.isOpened ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: auto;
  min-height: 100%;
  background-color: rgba(0,0,0,.6);
  overflow: auto;

  body {
    overflow: hidden !important;
  }
`
