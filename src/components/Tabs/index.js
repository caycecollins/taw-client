import React from 'react'
import PropTypes from 'prop-types'
import { connect } from '@cerebral/react'
import { state, props } from 'cerebral/tags'
import styled, { css } from 'styled-components'
import { rgba } from 'polished'

const Tabs = props => {
  return (
    <TabsContainer
      active={props.active}
      className={props.className}
    >
      {props.tabs && Object.keys(props.tabs).map((tab, index) => {
        return (
          <Tab
            key={index}
            active={props.currentView === tab}
            onClick={() => props.onClick({ view: tab })}
          >
            {props.tabs[tab].label}
          </Tab>
        )
      })}
    </TabsContainer>
  )
}

Tabs.propTypes = {
  tabs: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  currentView: PropTypes.string,
  active: PropTypes.bool,
  className: PropTypes.string,
}

export default connect(
  {
    currentView: state`${props`statePath`}`,
  },
  Tabs
)

const TabsContainer = styled.div`
  display: flex;
  align-items: center;
  height: ${props => props.active ? '56px' : '0px'};
  overflow: hidden;
  padding: 0 24px;
  transition: all .3s cubic-bezier(.4,0,.2,1);
  @media (max-width: 600px) {
    margin-top: 24px;
    overflow-x: auto;
    padding: 0;
    padding-right: 24px;
    height: ${props => props.active ? '48px' : '0px'};
    width: auto;
    width: 100vw;
  }
`

const Tab = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 56px;
  margin: 0 24px;
  padding: 4px 1px 0 1px;
  color: ${props => props.active ? props.theme.colors.armyWhite : props.theme.colors.armyGreen};
  transition: all .3s cubic-bezier(.4,0,.2,1);
  text-transform: capitalize;
  white-space: nowrap;
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
    width: 100%;
    height: ${props => props.active ? '4px' : '0'};
    content: '';
    background-color: ${props => props.active ? props.theme.colors.armyWhite : props.theme.colors.tan};
    transition: all .3s cubic-bezier(.4,0,.2,1);
  }
  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin: 0;
    margin-right: 24px;
  }
  @media (max-width: 600px) {
    padding: 4px 0px;
    height: 48px;
    margin-right: 16px;
  }
`
