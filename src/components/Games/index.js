import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'cerebral/react'
import { state, signal } from 'cerebral/tags'

import ViewContainer from '../ViewContainer'
import Link from '../Link'

function Games ({ gamesList }) {
  return (
    <ViewContainer>
      Game Divisions
      <br />
      <br />
      {gamesList && gamesList.map((game, index) => {
        return (
          <Link
            key={game.id}
            routeTo="game"
            routeParams={{ id: JSON.stringify(game.id) }}
            label={game.name}
          >
          </Link>
        )
      })}

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
