import styled from 'styled-components'

export const Image = styled.img`
  margin: 0.5rem;
  height: 100%;
  width: calc(100% * (1/4) - 1rem);

  @media (max-width: 968px) {
    width: calc(100% * (1/2) - 1rem);
    height: calc(100% * (1/2) - 1rem);
  }

  @media (max-width: 560px) {
    width: calc(100% - 1rem);
    height: calc(100% - 1rem);
  }
`
