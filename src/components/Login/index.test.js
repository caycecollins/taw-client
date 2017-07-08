import React from 'react'
import { mount } from 'enzyme'
import { StateContainer } from 'cerebral/react'

import Login from '../Login'

test('<Login />', () => {
  return new Promise((resolve) => {
    const state = {
      authorization: {
        username: 'foo',
        password: 'bar',
      },
    }
    const signals = {
      'authorization.usernameChanged': (input) => {
        expect(input).toEqual({ username: state.authorization.username })
      },
      'authorization.passwordChanged': (input) => {
        expect(input).toEqual({ password: state.authorization.password })
      },
      'authorization.authenticationRequested': (input) => {
        resolve()
      },
    }
    const wrapper = mount(
      <StateContainer state={state} signals={signals}>
        <Login />
      </StateContainer>
    )
    const usernameField = wrapper.find('input[type="text"]')
    const passwordField = wrapper.find('input[type="password"]')
    expect(usernameField.node.value).toBe(state.authorization.username)
    expect(passwordField.node.value).toBe(state.authorization.password)
    usernameField.simulate('change')
    passwordField.simulate('change')
    wrapper.find('button').simulate('click')
  })
})
