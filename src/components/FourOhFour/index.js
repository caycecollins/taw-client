import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state } from 'cerebral/tags'

import ViewContainer from '../ViewContainer'
import Link from '../Link'
import Button from '../Button'

const FourOhFour = props =>
  <ViewContainer backgroundImage="/images/in-tank-bg.jpg">
    <h2>Page not found.</h2>
    The database is still not populated with real TAW data. Get very comfortable with this page :)
    <br />
    <br />
    {props.previousView && props.previousView !== 'empty'
      ? <span>
        <Link routeTo={props.previousView}>
          <Button icon="angle-left" label="Go Back" />
        </Link>
        <br />
      </span>
      : <span>
        <Link routeTo="dashboard">
          <Button icon="home" label="Go to Dashboard" />
        </Link>
        <br />
        <Link routeTo="games">
          <Button icon="sitemap" label="Go to Game Divisions" />
        </Link>
      </span>
    }
  </ViewContainer>

FourOhFour.propTypes = {
  previousView: PropTypes.string,
}

export default connect(
  {
    previousView: state`app.previousView`,
  },
  FourOhFour
)
