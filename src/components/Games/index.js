import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'cerebral/react'
import { state } from 'cerebral/tags'
import { form } from '@cerebral/forms'
import FlipMove from 'react-flip-move'

import ViewContainer from '../ViewContainer'
import Link from '../Link'
import Input from '../Input'

function Games (props) {
  function filterGames (games, term) {
    return games.filter((game) => {
      const gameName = game.name.toLowerCase()
      return gameName.search(term.toLowerCase()) > -1
    })
  }
  var games = filterGames(props.games, props.filterGamesTerm)
  return (
    <ViewContainer>
      <ViewHeader>
        Game Divisions
        <br />
        {Object.keys(props.form.getFields()).map((field, index) =>
          <Input
            type={props.form[field].type}
            name={field}
            key={index}
            path={`games.form.${field}`}
            label={false}
            placeholder="Type to filter games"
          />
        )}
      </ViewHeader>
      <GamesContainer>
        <FlipMove
          easing="ease-in-out"
          duration={200}
          staggerDelayBy={30}
          appearAnimation="elevator"
          enterAnimation="none"
          leaveAnimation="none"
          maintainContainerHeight={true}
        >
          {props.showGames && games && games
            .map((game, index) =>
              <Game
                key={game.id}
                routeTo="game"
                routeParams={{ id: game.id.toString() }}
              >
                <Name>{game.name}</Name>
              </Game>
            )
          }
        </FlipMove>
      </GamesContainer>
    </ViewContainer>
  )
}

Games.propTypes = {
  games: PropTypes.array,
  showGames: PropTypes.bool,
  form: PropTypes.object,
  filterGamesTerm: PropTypes.string,
}

export default connect(
  {
    form: form(state`games.form`),
    games: state`games.data`,
    showGames: state`games.toggle`,
    filterGamesTerm: state`games.form.filterGamesTerm.value`,
    filteredGames: state`games.filteredGames`,
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
  > div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    padding: 24px;
  }
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
