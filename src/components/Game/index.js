import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state, signal } from 'cerebral/tags'
import styled from 'styled-components'
// import { rgba } from 'polished'

import ViewContainer from '../ViewContainer'
import Link from '../Link'
import Button from '../Button'
import Tabs from '../Tabs'

import InfoAndNews from './InfoAndNews'
import StructureAndMembers from './StructureAndMembers'
import Events from './Events'
import Forums from './Forums'

const views = {
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
  const ContentComponent = props.view ? views[props.view].component : views.info.component
  return (
    <ViewContainer backgroundImage="/images/bf1-background.jpg" centered>
      <GameWrapper>
        <Header>
          <Crumbs>
            <Link routeTo="games.routed">
              <Button outline={false} size="xs" icon="angle-left" label="Back to all games" />
            </Link>
          </Crumbs>
          <GameContainer>
            <GameArea>
              <Name>{props.game.name}</Name>
              <Avatar />
            </GameArea>
          </GameContainer>
          <StyledTabs
            tabs={views}
            statePath="game.view"
            onClick={props.gameViewChanged}
            active
          />
        </Header>
        <Gap />
        <Content>
          <ContentComponent />
        </Content>
      </GameWrapper>
    </ViewContainer>
  )
}

Game.propTypes = {
  view: PropTypes.string,
  game: PropTypes.object,
  gameViewChanged: PropTypes.func,
}

export default connect(
  {
    view: state`game.view`,
    game: state`game.gameData`,
    gameViewChanged: signal`game.gameViewChanged`,
  },
  Game
)

const GameWrapper = styled.div`
  display: flex;
  flex: 1 0 auto;
  width: calc(100% + 48px);
  height: auto;
  flex-direction: column;
  margin: -24px;
  @media (max-width: 600px) {
    width: 100vw;
    margin-top: 24px;
  }
`

const Header = styled.div`
  position: relative;
  display: flex;
  flex: 1 0 auto;
  height: 112px;
  max-height: 112px;
  background-color: rgba(0,0,0,0.7);
  padding: 24px 0px 0px 40px;
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
  top: 0;
  left: 0;
`

const Gap = styled.div`
  flex: 1 0 auto;
  height: 320px;
  max-height: 320px;
  padding: 24px;
  @media (max-width: 600px) {
    flex: 0;
    height: 0;
    padding: 0;
  }
`

const GameContainer = styled.div`
  position: relative;
  display: flex;
  width: 240px;
  @media (max-width: 768px) {
    width: 160px;
  }
  @media (max-width: 600px) {
    width: auto;
  }
`

const GameArea = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-conent: center;
  width: 100%;
  margin-top: 16px;
  @media (max-width: 600px) {
    position: relative;
  }
`

const Name = styled.div`
  font-size: 1.6rem;
  color: ${props => props.theme.colors.armyWhite};
  text-align: center;
`

const Avatar = styled.div`
  width: 160px;
  height: 160px;
  max-height: 160px;
  margin-top: 16px;
  background-color: ${props => props.theme.colors.lightTan};
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
  align-self: flex-end;
  @media (max-width: 600px) {
    align-self: flex-start;
  }
`

const Content = styled.div`
  display: flex;
  flex: 1 0 auto;
  height: 100%;
  background-color: rgba(0,0,0,0.7);
  padding: 24px 40px;
`
