import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state, signal } from 'cerebral/tags'
import styled from 'styled-components'
import { rgba } from 'polished'
import { CSSTransitionGroup } from 'react-transition-group'

import ViewEvent from '../Event'
import CreateEvent from '../Event/Create'
import Button from '../Button'
import Icon from '../Icon'

const Empty = (props) => <div></div>

const views = {
  empty: Empty,
  viewEvent: ViewEvent,
  createEvent: CreateEvent,
}

const Sidebar = (props) => {
  const SidebarComponent = props.sidebarView ? views[props.sidebarView] : views.empty
  return (
    <div>
      <CSSTransitionGroup
        transitionName="view"
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
        component="div"
      >
        {props.sidebarActive &&
          <SidebarOverlay
            sidebarActive={props.sidebarActive}
            onClick={() => props.sidebarActiveToggled({ value: false })}
          />
        }
      </CSSTransitionGroup>
      <SidebarContainer
        active={props.sidebarActive}
      >
        <SidebarHeader>
          <StyledIcon
            name={props.sidebarIcon || ''}
            size={32}
          />
          <Title>{props.sidebarTitle}</Title>
          <Button
            size="xs"
            onClick={() => props.sidebarActiveToggled({ value: false })}
            icon="close"
          />
        </SidebarHeader>
        <SidebarComponentContainer>
          <SidebarComponent />
        </SidebarComponentContainer>
      </SidebarContainer>
    </div>
  )
}

Sidebar.propTypes = {
  sidebarActive: PropTypes.bool,
  sidebarActiveToggled: PropTypes.func,
  sidebarView: PropTypes.string,
  sidebarTitle: PropTypes.string,
  sidebarIcon: PropTypes.string,
}

export default connect(
  {
    sidebarActive: state`app.sidebarActive`,
    sidebarActiveToggled: signal`app.sidebarActiveToggled`,
    sidebarView: state`app.sidebarView`,
    sidebarTitle: state`app.sidebarTitle`,
    sidebarIcon: state`app.sidebarIcon`,
  }, Sidebar
)

const SidebarOverlay = styled.div`
  position: fixed;
  width: 100%;
  top: 48px;
  right: 0;
  left: 0;
  height: calc(100vw - 48px);
  background-color: rgba(0,0,0,0.8);
  z-index: 9997;
  overflow: hidden;
  &:hover {
    cursor: pointer;
  }
  `

const SidebarContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 70%;
  max-width: 1024px;
  height: calc(100% - 48px);
  top: 48px;
  right: ${props => props.active ? 0 : '-70%'};
  background-color: ${props => { return rgba(props.theme.colors.darkGray4, 0.9) }};
  overflow-y: auto;
  overflow-x: hidden;
  transition: all .6s cubic-bezier(.4,0,.2,1);
  z-index: 9998;
`

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  border-bottom: 1px solid ${props => props.theme.colors.lightTan};
  color: ${props => props.theme.colors.lightTan};
  padding: 0 40px;
`
const StyledIcon = styled(Icon)`
`

const Title = styled.div`
  width: 100%;
  font-size: 2rem;
  margin-top: 6px;
  padding-left: 24px;
`

const SidebarComponentContainer = styled.div`
  padding: 40px;
`
