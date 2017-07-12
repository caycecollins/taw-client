import styled, { css } from 'styled-components'

export default styled.div`
  margin-top: 4px;
  color: ${props => props.theme.colors.lightRed};
  font-size: ${props => {
    if (props.size === 'xs') return css`0.8rem;`
    if (props.size === 'sm') return css`0.9rem;`
    if (props.size === 'lg') return css`1.1rem;`
    return css`1rem`
  }}
`
