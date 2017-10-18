import React from 'react'
import PropTypes from 'prop-types'
import { connect } from '@cerebral/react'
import { state, signal } from 'cerebral/tags'
import styled, { css } from 'styled-components'
import { rgba } from 'polished'
import { CSSTransitionGroup } from 'react-transition-group'

import EventGeneralTab from '../Events/EventGeneralTab'
import EventEditTab from '../Events/EventEditTab'
import EventAttendanceTab from '../Events/EventAttendanceTab'
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
        component: EventGeneralTab,
        formPath: null,
        submitSignal: null,
      },
      attendance: {
        component: EventAttendanceTab,
        formPath: null,
        submitSignal: null,
      },
      edit: {
        component: EventEditTab,
        formPath: 'events.editEventForm',
        resetSignal: 'events.editEventReset',
        submitSignal: 'events.editEventSubmitted',
      },
    },
  },
  scheduleEvent: {
    title: 'Schedule New Event',
    icon: 'calendar-plus-o',
    component: ScheduleEventSidebar,
    formPath: 'events.scheduleEventForm',
    resetSignal: 'events.scheduleEventReset',
    submitSignal: 'events.scheduleEventSubmitted',
  },
  reportEvent: {
    title: 'Report Event',
    icon: 'calendar-check-o',
    component: ReportEventSidebar,
    formPath: 'events.reportEventForm',
    submitSignal: 'events.reportEventSubmitted',
  },
  viewProfile: {
    title: null,
    icon: 'user',
    defaultTab: 'general',
    tabs: {
      general: {
        component: EditProfileSidebar,
        formPath: 'profile.editProfileForm',
        submitSignal: 'profile.editProfileSubmitted',
      },
    },
  },
}

const determineSidebarComponent = props => {
  if (props.sidebarTab) return views[props.sidebarView].tabs[props.sidebarTab].component
  return views[props.sidebarView].defaultTab || views[props.sidebarView].component
}

const setSidebarActions = props => {
  if (props.sidebarTab) {
    const tab = views[props.sidebarView].tabs[props.sidebarTab]
    return props.sidebarActionsUpdated({
      sidebarFormPath: tab.formPath || 'app.emptySidebarFormPath',
      sidebarResetSignal: tab.resetSignal || 'app.formResetClicked',
      sidebarSubmitSignal: tab.submitSignal || 'app.sidebarSubmit',
    })
  }
  const defaultTab = views[props.sidebarView].defaultTab
  // if the view has a default tab, use that tab's actions, otherwise the actions are defined at the top level of the view object
  const sidebarFormPath = defaultTab ? views[props.sidebarView].tabs[defaultTab].formPath : views[props.sidebarView].formPath
  const sidebarResetSignal = defaultTab ? views[props.sidebarView].tabs[defaultTab].resetSignal : views[props.sidebarView].resetSignal
  const sidebarSubmitSignal = defaultTab ? views[props.sidebarView].tabs[defaultTab].submitSignal : views[props.sidebarView].submitSignal
  return props.sidebarActionsUpdated({
    sidebarFormPath: sidebarFormPath || 'app.emptySidebarFormPath',
    sidebarResetSignal: sidebarResetSignal || 'app.formResetClicked',
    sidebarSubmitSignal: sidebarSubmitSignal || 'app.sidebarSubmit',
  })
}

const Sidebar = (props) => {
  const SidebarComponent = props.sidebarView ? determineSidebarComponent(props) : views.empty
  props.sidebarView && props.sidebarView !== 'empty' && setSidebarActions(props)
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
            <SidebarComponentContainer
              key={props.sidebarTab || props.sidebarView}
              sidebarTab={props.sidebarTab}
            >
              {props.sidebarView && <SidebarComponent/>}
            </SidebarComponentContainer>
          </CSSTransitionGroup>
          <SidebarActions />
        </SidebarContainer>
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
  z-index: 8000;
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
  z-index: 8001;
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
  overflow: hidden;
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
  @media (max-width: 600px) {
    padding: 0 16px;
    height: 48px;
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
  @media (max-width: 600px) {
    margin-top: 48px;
    padding: 0 16px;
    overflow-x: auto;
    height: ${props => props.active ? '48px' : '0px'};
  }
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
  @media (max-width: 600px) {
    padding: 4px 16px;
    flex: 1 0 auto;
  }
`

const SidebarComponentContainer = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100% - ${props => props.sidebarTab ? 192 : 136}px);
  padding: 24px 40px;
  overflow: auto;
  @media (max-width: 960px) {
    padding: 24px;
  }
  @media (max-width: 720px) {
    padding: 16px;
  }
  @media (max-width: 600px) {
    height: calc(100% - 144px);
    .row {
      margin-left: 0;
      margin-right: 0;
      padding: 0;
    }
  }
`
