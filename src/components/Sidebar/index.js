import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state, signal } from 'cerebral/tags'
import styled, { css } from 'styled-components'
import { rgba } from 'polished'
import { CSSTransitionGroup } from 'react-transition-group'

import ViewEventSidebar from '../Events/ViewEventSidebar'
import EventAttendanceSidebar from '../Events/EventAttendanceSidebar'
import ScheduleEventSidebar from '../Events/ScheduleEventSidebar'
import ReportEventSidebar from '../Events/ReportEventSidebar'
import EditProfileSidebar from '../Profile/EditProfileSidebar'
import Button from '../Button'
import Icon from '../Icon'

import SidebarActions from './SidebarActions'

const Empty = () => <div></div>

const views = {
  empty: { component: Empty },
  viewEvent: {
    title: null,
    icon: 'calendar-o',
    defaultTab: 'general',
    tabs: {
      general: {
        component: ViewEventSidebar,
        resetFormPath: null,
        submitSignal: null,
      },
      attendance: {
        component: EventAttendanceSidebar,
        resetFormPath: null,
        submitSignal: null,
      },
    },
  },
  scheduleEvent: {
    title: 'Schedule New Event',
    icon: 'calendar-plus-o',
    component: ScheduleEventSidebar,
    resetFormPath: 'events.scheduleEventForm',
    submitSignal: 'events.scheduleEventSubmitted',
  },
  reportEvent: {
    title: 'Report Event',
    icon: 'calendar-check-o',
    component: ReportEventSidebar,
    resetFormPath: 'events.reportEventForm',
    submitSignal: 'events.reportEventSubmitted',
  },
  viewProfile: {
    title: null,
    icon: 'user',
    defaultTab: 'general',
    tabs: {
      general: {
        component: EditProfileSidebar,
        resetFormPath: 'profile.editProfileForm',
        submitSignal: 'profile.editProfileSubmitted',
      },
    },
  },
}

const determineSidebarComponent = props => {
  if (props.sidebarTab) return views[props.sidebarView].tabs[props.sidebarTab].component
  return views[props.sidebarView].defaultTab || views[props.sidebarView].component
}

const setSidebarAction = props => {
  if (props.sidebarTab) {
    const sidebarReset = views[props.sidebarView].tabs[props.sidebarTab].resetFormPath
    const sidebarSubmit = views[props.sidebarView].tabs[props.sidebarTab].submitSignal
    return props.sidebarActionsUpdated({ sidebarReset: sidebarReset || 'app.sidebarReset', sidebarSubmit: sidebarSubmit || 'app.sidebarSubmit' })
  }
  const defaultTab = views[props.sidebarView].defaultTab
  const sidebarReset = defaultTab ? views[props.sidebarView].tabs[defaultTab].resetFormPath : views[props.sidebarView].resetFormPath
  const sidebarSubmit = defaultTab ? views[props.sidebarView].tabs[defaultTab].submitSignal : views[props.sidebarView].submitSignal
  return props.sidebarActionsUpdated({ sidebarReset: sidebarReset || 'app.sidebarReset', sidebarSubmit: sidebarSubmit || 'app.sidebarSubmit' })
}

const Sidebar = (props) => {
  const SidebarComponent = props.sidebarView ? determineSidebarComponent(props) : views.empty
  props.sidebarView && props.sidebarView !== 'empty' && setSidebarAction(props)
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
      <SidebarWrapper active={props.sidebarActive && !props.loggingOut}>
        <SidebarContainer>
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
        </SidebarContainer>
        <SidebarActions />
      </SidebarWrapper>
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
  sidebarSubmitAction: PropTypes.func,
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
    sidebarActionsUpdated: signal`app.sidebarActionsUpdated`,
  },
  Sidebar
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

const SidebarWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 70%;
  max-width: 1024px;
  height: calc(100% - 48px);
  top: 48px;
  right: ${props => props.active ? '0%' : '-70%'};
  background-color: ${props => { return rgba(props.theme.colors.darkGray4, 0.9) }};
  overflow: hidden;
  transition: all .3s cubic-bezier(.4,0,.2,1);
  z-index: 9998;
  @media (max-width: 720px) {
    width: 100%;
    right: ${props => props.active ? '0%' : '-100%'};
  }
`

const SidebarContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: auto;
  transition: all .3s cubic-bezier(.4,0,.2,1);
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
  margin-top: -6px;
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
  padding: 24px 40px 64px 40px;
  @media (max-width: 960px) {
    padding: 24px;
  }
  @media (max-width: 720px) {
    padding: 16px;
  }
`
