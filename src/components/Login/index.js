import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import {
  state,
  signal,
} from 'cerebral/tags'
import styled from 'styled-components'

import ViewContainer from '../ViewContainer'

function Login (props) {
  return (
    <ViewContainer>
      <div>
        <br />
        <input
          // autoFocus // (TODO) removed due to some wonkyness with dropdown causing focus/blur on this element
          type="text"
          value={props.username}
          onChange={e => props.usernameChanged({ username: e.target.value })}
        />
        <input
          type="password"
          value={props.password}
          onChange={e => props.passwordChanged({ password: e.target.value })}
        />
        <br />
        <div>
          <button
            onClick={() => props.viewChanged({ view: 'main' })} // until auth is in
          />
        </div>
      </div>
    </ViewContainer>
  )
}

Login.propTypes = {
  password: PropTypes.string,
  username: PropTypes.string,
  passwordChanged: PropTypes.func,
  authenticationRequested: PropTypes.func,
  usernameChanged: PropTypes.func,
  viewChanged: PropTypes.func,
}

export default connect(
  {
    username: state`authorization.username`,
    password: state`authorization.password`,
    usernameChanged: signal`authorization.usernameChanged`,
    passwordChanged: signal`authorization.passwordChanged`,
    authenticationRequested: signal`authorization.authenticationRequested`,
    viewChanged: signal`app.viewChanged`,
  },
  Login
)
