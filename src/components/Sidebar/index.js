import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state, signal } from 'cerebral/tags'
import styled from 'styled-components'

const SidebarTest = (props) => <div>Test</div>

const views = {
  test: SidebarTest,
}

const Sidebar = (props) => {
  const SidebarComponent = props.sidebarView ? views[props.sidebarView] : views['test']
  return (
    <StyledSidebar
      active={props.sidebarActive}
      onOverlayClick={() => props.sidebarActiveToggled({ value: false })}
      width={5}
    >
      <StyledIconButton
        icon="close"
        onClick={() => props.sidebarActiveToggled({ value: false })}
      />
      <SidebarComponent />
    </StyledSidebar>
  )
}

Sidebar.propTypes = {
  sidebarActive: PropTypes.bool,
  sidebarActiveToggled: PropTypes.func,
  sidebarView: PropTypes.string,
}

export default connect(
  {
    sidebarActive: state`app.sidebarActive`,
    sidebarActiveToggled: signal`app.sidebarActiveToggled`,
    sidebarView: state`app.sidebarView`,
  }, Sidebar
)

const StyledSidebar = styled.div`
  position: absolute;
  width: ${props => props.active ? '300px' : '0'};
  height: 100vh;
  right: ${props => props.active ? 0 : '-10px'};
  background-color: #fff;
  border-left: 0px !important;
`
const StyledIconButton = styled.button`
  position: absolute;
  right: 0;
`
