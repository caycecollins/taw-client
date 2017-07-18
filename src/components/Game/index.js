import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state } from 'cerebral/tags'

import ViewContainer from '../ViewContainer'
import Link from '../Link'
import Button from '../Button'

const Games = game =>
  <ViewContainer backgroundImage="/images/bf1-background.jpg">
    <Link routeTo="games">
      <Button icon="angle-left" label="Back to all games" />
    </Link>
    <br />
    <br />
    <br />
    <br />
    <div style={{ backgroundColor: 'rgba(0,0,0,.6)', height: 'calc(100% - 69px)', margin: '-24px' }}>
      {game && game.name} (id: {game && game.id})
    </div>
  </ViewContainer>

Games.propTypes = {
  game: PropTypes.object,
}

Games.defaultProps = {
  game: {
    id: '',
    name: '',
  },
}

export default connect(
  {
    game: state`game`,
  },
  Games
)
