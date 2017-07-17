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

const Sidebar = (props) => {
  function determineSidebarComponent () {
    if (props.sidebarTab) return views[props.sidebarView].tabs[props.sidebarTab]
    return views[props.sidebarView].defaultTab || views[props.sidebarView].component
  }
  const SidebarComponent = props.sidebarView ? determineSidebarComponent() : views.empty
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
      <SidebarContainer active={props.sidebarActive}>
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
          <SidebarComponentContainer key={props.sidebarTab}>
            {props.sidebarView && <SidebarComponent/>}
          </SidebarComponentContainer>
        </CSSTransitionGroup>
      </SidebarContainer>
    </div>
  )
}

Sidebar.propTypes = {
  sidebarActive: PropTypes.bool,
  sidebarActiveToggled: PropTypes.func,
  sidebarTabChanged: PropTypes.func,
  sidebarView: PropTypes.string,
  sidebarTitle: PropTypes.string,
  sidebarIcon: PropTypes.string,
  sidebarTab: PropTypes.string,
}

export default connect(
  {
    sidebarActive: state`app.sidebarActive`,
    sidebarActiveToggled: signal`app.sidebarActiveToggled`,
    sidebarTabChanged: signal`app.sidebarTabChanged`,
    sidebarView: state`app.sidebarView`,
    sidebarTitle: state`app.sidebarTitle`,
    sidebarIcon: state`app.sidebarIcon`,
    sidebarTab: state`app.sidebarTab`,
  }, Sidebar
)

const SidebarOverlay = styled.div`
  position: fixed;
  width: 100%;
  top: 48px;
  right: 0;
  left: 0;
  height: calc(100vw - 48px);
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
`
const StyledIcon = styled(Icon)`
`

const Title = styled.div`
  width: 100%;
  font-size: 2rem;
  margin-top: 6px;
  padding-left: 24px;
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
`
