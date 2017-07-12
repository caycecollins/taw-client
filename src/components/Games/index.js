import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'cerebral/react'
import { state } from 'cerebral/tags'
import { CSSTransitionGroup } from 'react-transition-group'

import ViewContainer from '../ViewContainer'
import Link from '../Link'

function Games ({ gamesList }) {
  return (
    <ViewContainer>
      <ViewHeader>
        Game Divisions
      </ViewHeader>
      <CSSTransitionGroup
        transitionName="initial"
        transitionAppear={true}
        transitionAppearTimeout={1000}
        transitionEnter={false}
        transitionLeave={false}
        component="span"
      >
        <GamesContainer>
          {gamesList && gamesList.map((game, index) => {
            return (
              <Game
                key={game.id}
                routeTo="game"
                routeParams={{ id: JSON.stringify(game.id) }}
              >
                <Name>{game.name}</Name>
              </Game>
            )
          })}
        </GamesContainer>
      </CSSTransitionGroup>
    </ViewContainer>
  )
}

Games.propTypes = {
  gamesList: PropTypes.array,
}

export default connect(
  {
    gamesList: state`games.gamesList`,
  },
  Games
)

const ViewHeader = styled.div`
  margin: 24px 0;
  font-size: 24px;
  padding-left: 40px;
  text-transform: uppercase;
  color: ${props => props.theme.colors.lightTan};
`

const GamesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  padding: 24px;
`

const Game = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 150px;
  height: 150px;
  margin: 16px;
  padding: 16px;
  background-color: rgba(0,0,0,.3);
  &:hover {
    background-color: rgba(0,0,0,.6);
  }
`

const Name = styled.div`
  text-align: center;
`
