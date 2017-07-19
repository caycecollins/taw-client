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

const filterGames = (games, term) => {
  return games.filter((game) => {
    const gameName = game.name.toLowerCase()
    return gameName.search(term.toLowerCase()) > -1
  })
}

const Games = props =>
  <ViewContainer>
    <ViewHeader>
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
        {filterGames(props.games, props.filterGamesTerm).map((game, index) =>
          <Game
            key={game.id}
            routeTo="game"
            routeParams={{ id: game.id.toString() }}
          >
            <Name>{game.name}</Name>
          </Game>
        )}
      </FlipMove>
    </GamesContainer>
  </ViewContainer>

Games.propTypes = {
  games: PropTypes.array,
  form: PropTypes.object,
  filterGamesTerm: PropTypes.string,
}

Games.defaultProps = {
  games: [],
}

export default connect(
  {
    form: form(state`games.form`),
    games: state`games.data`,
    filterGamesTerm: state`games.form.filterGamesTerm.value`,
    filteredGames: state`games.filteredGames`,
  },
  Games
)

const ViewHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  padding: 16px 0;
  text-transform: uppercase;
  color: ${props => props.theme.colors.lightTan};
  transition: all .3s cubic-bezier(.4,0,.2,1);
  @media (max-width: 768px) {
    justify-content: center;
  }
`

const GamesContainer = styled.div`
  > div {
    display: grid;
    grid-gap: 24px;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    transition: all .3s cubic-bezier(.4,0,.2,1);
    @media (max-width: 768px) {
      justify-content: center;
    }
  }
`

const Game = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  padding: 16px;
  background-color: rgba(0,0,0,.3);
  transition: all .3s cubic-bezier(.4,0,.2,1);
  border-radius: 2px;
  font-size: 0.9rem;
  &:hover {
    background-color: rgba(0,0,0,.6);
  }
  @media (max-width: 768px) {
    margin: 16px;
  }
  @media (max-width: 420px) {
    margin: 16px 0px;
    width: 100%;
  }
`

const Name = styled.div`
  text-align: center;
`
