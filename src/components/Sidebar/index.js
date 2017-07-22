import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state, signal } from 'cerebral/tags'
import styled, { css } from 'styled-components'
import { rgba } from 'polished'
import { CSSTransitionGroup } from 'react-transition-group'

import ViewEvent from '../Event'
import EventAttendance from '../Event/EventAttendance'
import CreateEvent from '../Event/CreateModal'
import ReportEvent from '../Event/ReportModal'
import ViewProfile from '../Profile/ProfileModal'
import Button from '../Button'
import Icon from '../Icon'

const Empty = () => <div></div>

const views = {
  empty: { component: Empty },
  viewEvent: {
    title: null,
    icon: 'calendar-o',
    defaultTab: 'general',
    tabs: {
      general: ViewEvent,
      attendance: EventAttendance,
    },
  },
  createEvent: {
    title: 'Schedule New Event',
    icon: 'calendar-plus-o',
    component: CreateEvent,
  },
  reportEvent: {
    title: 'Report an Event',
    icon: 'calendar-check-o',
    component: ReportEvent,
  },
  viewProfile: {
    title: null,
    icon: 'user',
    defaultTab: 'general',
    tabs: {
      general: ViewProfile,
    },
  },
}

const determineSidebarComponent = props => {
  if (props.sidebarTab) return views[props.sidebarView].tabs[props.sidebarTab]
  return views[props.sidebarView].defaultTab || views[props.sidebarView].component
}

const Sidebar = (props) => {
  const SidebarComponent = props.sidebarView ? determineSidebarComponent(props) : views.empty
  let tab = ''
  if (props.sidebarTab) tab = `.${props.sidebarTab}`
  const signalString = `${props.currentView}.${props.sidebarView}${tab}`
  return (
    <div>
      <CSSTransitionGroup
        transitionName="sidebarOverlay"
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        component="div"
      >
        {props.sidebarActive &&
          <SidebarOverlay
            key="sidebaroverlay"
            sidebarActive={props.sidebarActive}
            onClick={() => props.sidebarActiveToggled({ value: false })}
          />
        }
      </CSSTransitionGroup>
      <SidebarContainer active={props.sidebarActive && !props.loggingOut}>
        <CSSTransitionGroup
          transitionName="sidebarView"
          transitionAppearTimeout={300}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
          component="span"
        >
          {props.sidebarView && props.sidebarView !== 'empty' &&
            <SidebarHeader key={props.sidebarView}>
              <StyledIcon
                name={views[props.sidebarView].icon || ''}
                size={32}
              />
              <Title>{props.sidebarTitle || views[props.sidebarView].title}</Title>
              <Button
                size="xs"
                onClick={() => props.sidebarActiveToggled({ value: false })}
                icon="close"
              />
            </SidebarHeader>
          }
        </CSSTransitionGroup>
        <SidebarTabs active={props.sidebarTab}>
          {props.sidebarView && props.sidebarTab && Object.keys(views[props.sidebarView].tabs).map((tab, index) => {
            return (
              <Tab
                key={index}
                active={props.sidebarTab === tab}
                onClick={() => props.sidebarTabChanged({ tab })}
              >
                {tab}
              </Tab>
            )
          })}
        </SidebarTabs>
        <CSSTransitionGroup
          transitionName="sidebarView"
          transitionAppearTimeout={300}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
          component="span"
        >
          <SidebarComponentContainer key={props.sidebarTab || props.sidebarView}>
            {props.sidebarView && <SidebarComponent/>}
          </SidebarComponentContainer>
        </CSSTransitionGroup>
        <CSSTransitionGroup
          transitionName="sidebarView"
          transitionAppearTimeout={300}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
          component="span"
        >
          <SidebarActions key={'footer' + props.sidebarTab || 'footer' + props.sidebarView}>
            <Action
              type="reset"
              onClick={() => props.sidebarReset({ signal: signalString + 'Form' })}
            >
              reset
            </Action>
            <Action
              type="cancel"
              onClick={() => props.sidebarActiveToggled({ value: false })}
            >
              cancel
            </Action>
            <Action
              type="submit"
              onClick={() => props.sidebarSubmit({ signal: signalString })}
            >
              submit
            </Action>
          </SidebarActions>
        </CSSTransitionGroup>
      </SidebarContainer>
    </div>
  )
}

Sidebar.propTypes = {
  currentView: PropTypes.string,
  sidebarActive: PropTypes.bool,
  sidebarActiveToggled: PropTypes.func,
  sidebarTabChanged: PropTypes.func,
  sidebarView: PropTypes.string,
  sidebarTitle: PropTypes.string,
  sidebarIcon: PropTypes.string,
  sidebarTab: PropTypes.string,
  loggingOut: PropTypes.bool,
  sidebarSubmit: PropTypes.func,
  sidebarReset: PropTypes.func,
}

export default connect(
  {
    currentView: state`app.currentView`,
    sidebarActive: state`app.sidebarActive`,
    sidebarActiveToggled: signal`app.sidebarActiveToggled`,
    sidebarTabChanged: signal`app.sidebarTabChanged`,
    sidebarView: state`app.sidebarView`,
    sidebarTitle: state`app.sidebarTitle`,
    sidebarIcon: state`app.sidebarIcon`,
    sidebarTab: state`app.sidebarTab`,
    loggingOut: state`authorization.loggingOut`,
    sidebarReset: signal`${state`app.sidebarReset`}`,
    sidebarSubmit: signal`${state`app.sidebarSubmit`}`,
  }, Sidebar
)

const SidebarOverlay = styled.div`
  position: fixed;
  width: 100%;
  top: 48px;
  right: 0;
  left: 0;
  height: calc(100vh - 48px);
  background-color: rgba(0,0,0,0.7);
  z-index: 9997;
  overflow: hidden;
  &:hover {
    cursor: pointer;
  }
  transition: all .4s cubic-bezier(.4,0,.2,1);
  `

const SidebarContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 70%;
  max-width: 1024px;
  height: calc(100% - 48px);
  top: 48px;
  right: ${props => props.active ? '0%' : '-70%'};
  background-color: ${props => { return rgba(props.theme.colors.darkGray4, 0.9) }};
  overflow-y: auto;
  overflow-x: hidden;
  transition: all .3s cubic-bezier(.4,0,.2,1);
  z-index: 9998;
  @media (max-width: 720px) {
    width: 100%;
    right: ${props => props.active ? '0%' : '-100%'};
  }
`

const SidebarHeader = styled.div`
  position: absolute;
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  border-bottom: 1px solid ${props => props.theme.colors.lightTan};
  color: ${props => props.theme.colors.lightTan};
  padding: 0 40px;
  @media (max-width: 720px) {
    padding: 0 24px;
  }
`
const StyledIcon = styled(Icon)`
  @media (max-width: 720px) {
    font-size: 1.4rem;
  }
  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
`

const Title = styled.div`
  width: 100%;
  font-size: 2rem;
  margin-top: 6px;
  padding-left: 24px;
  @media (max-width: 720px) {
    font-size: 1.4rem;

  }
  @media (max-width: 600px) {
    font-size: 1.2rem;
    padding-left: 16px;
  }
`

const SidebarTabs = styled.div`
  margin-top: 80px;
  display: flex;
  align-items: center;
  height: ${props => props.active ? '56px' : '0px'};
  overflow: hidden;
  padding: 0 24px;
  background-color: ${props => rgba(props.theme.colors.darkGray, 0.9)};
  transition: all .3s cubic-bezier(.4,0,.2,1);
`

const Tab = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 56px;
  margin-right: 16px;
  padding: 4px 24px 0 24px;
  color: ${props => props.active ? props.theme.colors.armyWhite : props.theme.colors.armyGreen};
  transition: all .3s cubic-bezier(.4,0,.2,1);
  text-transform: capitalize;
  ${props => !props.active && css`
    &:hover {
      color: ${props => props.theme.colors.tan};
      cursor: pointer;
      &:after {
        height: 4px;
        background-color: ${props => props.theme.colors.tan};
      }
    }
  `}
  &:after {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    margin: 0 auto;
    width: 62%;
    height: ${props => props.active ? '4px' : '0'};
    content: '';
    background-color: ${props => props.active ? props.theme.colors.armyWhite : props.theme.colors.tan};
    transition: all .3s cubic-bezier(.4,0,.2,1);
  }
`

const SidebarComponentContainer = styled.div`
  position: absolute;
  width: 100%;
  height: auto;
  padding: 40px;
  @media (max-width: 960px) {
    padding: 24px;
  }
  @media (max-width: 720px) {
    padding: 16px;
  }
`

const SidebarActions = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  width: 100%;
`

const Action = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: ${props => props.type === 'submit' || props.type === 'cancel' ? '1 0 auto' : '0 1 auto'};
  height: 56px;
  color: ${props => props.type === 'submit' ? props.theme.colors.darkGray2 : props.theme.colors.gray};
  background-color: ${props => {
    if (props.type === 'reset') return rgba(props.theme.colors.darkGray3, 0.6)
    if (props.type === 'cancel') return rgba(props.theme.colors.darkGray2, 0.5)
    if (props.type === 'submit') return rgba(props.theme.colors.armyGreen, 0.6)
  }};
  font-size: 1.2rem;
  text-transform: uppercase;
  padding: 4px 24px 0 24px;
  &:hover {
    color: ${props => props.theme.colors.armyWhite};
    background-color: ${props => props.type === 'submit' ? rgba(props.theme.colors.armyGreen, 1) : rgba(props.theme.colors.darkGray2, 1)};
    cursor: pointer;
  }
`
