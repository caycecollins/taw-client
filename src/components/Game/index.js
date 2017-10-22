import React from 'react'
import PropTypes from 'prop-types'
import { connect } from '@cerebral/react'
import { state, signal } from 'cerebral/tags'
import styled from 'styled-components'
import { CSSTransitionGroup } from 'react-transition-group'

import ViewContainer from '../ViewContainer'
import Link from '../Link'
import Button from '../Button'
import Tabs from '../Tabs'

import InfoAndNews from './InfoAndNews'
import StructureAndMembers from './StructureAndMembers'
import Events from './Events'
import Forums from './Forums'

const tabs = {
  info: {
    label: 'Info & News',
    component: InfoAndNews,
  },
  structure: {
    label: 'Roster',
    component: StructureAndMembers,
  },
  events: {
    label: 'Events',
    component: Events,
  },
  forums: {
    label: 'Forums',
    component: Forums,
  },
}

const Game = props => {
  const ContentComponent = props.tab
    ? tabs[props.tab].component
    : tabs.info.component
  return (
    <ViewContainer backgroundImage="/images/bf1-background.jpg" padding={0}>
      <GameWrapper>
        <Header>
          <Crumbs>
            <Link routeTo="games.routed">
              <Button
                outline={false}
                size="xs"
                icon="angle-left"
                label="Back to all games"
              />
            </Link>
          </Crumbs>

          <GameContainer>
            <Name>{props.game.name}</Name>
            <StyledTabs
              tabs={tabs || {}}
              statePath="game.tab"
              onClick={props.gameTabChanged}
              active
            />
          </GameContainer>
        </Header>
        <Gap>
          {props.game.iconUrl && (
            <Icon image={props.game.iconUrl.replace('/dynamicAssets', '')} />
          )}
        </Gap>
        <CSSTransitionGroup
          transitionName="view"
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={400}
          component="div"
        >
          <Content key={props.tab}>
            <ContentComponent />
          </Content>
        </CSSTransitionGroup>
      </GameWrapper>
    </ViewContainer>
  )
}

Game.propTypes = {
  tab: PropTypes.string,
  game: PropTypes.object,
  gameTabChanged: PropTypes.func,
}

export default connect(
  {
    tab: state`game.tab`,
    game: state`game.gameData`,
    gameTabChanged: signal`game.gameTabChanged`,
  },
  Game
)

const GameWrapper = styled.div`
  position: relative;
  display: flex;
  flex: 1 0 auto;
  width: 100%;
  height: 100%;
  flex-direction: column;
  @media (max-width: 600px) {
    width: 100vw;
    margin-top: 24px;
  }
`

const Header = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 136px;
  max-height: 136px;
  background-color: rgba(0, 0, 0, 0.7);
  padding-left: 24px;
  @media (max-width: 600px) {
    flex: 0;
    flex-direction: column;
    height: auto;
    max-height: initial;
    background-color: initial;
    padding: 0;
  }
`

const Crumbs = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
`

const Gap = styled.div`
  position: relative;
  flex: 1 0 auto;
  height: 320px;
  max-height: 320px;
  padding: 0 24px;
  margin-top: 128px;
  @media (max-width: 600px) {
    flex: 0;
    height: 0;
    padding: 0;
  }
`

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

const Name = styled.div`
  margin-left: 24px;
  font-size: 1.6rem;
  color: ${props => props.theme.colors.armyWhite};
`

const Icon = styled.div`
  position: absolute;
  bottom: 0;
  width: 160px;
  height: 160px;
  max-height: 160px;
  background: url(${props => props.image}) no-repeat center center;
  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
    max-height: 120px;
  }
  @media (max-width: 600px) {
    width: 160px;
    height: 160px;
    max-height: 160px;
  }
`

const StyledTabs = styled(Tabs)`
  padding-left: 0;
`

const Content = styled.div`
  position: absolute;
  top: 448px;
  display: flex;
  background-color: rgba(0, 0, 0, 0.7);
  background: linear-gradient(-0deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.7));
  width: 100%;
  min-height: calc(100% - 448px);
  padding: 24px 48px;
`
