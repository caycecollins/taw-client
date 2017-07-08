import authenticate from './authenticate'

test('should fail authentication with error', async () => {
  const state = await runAction(authenticate, {
    config,
    authorization: {
      username: 'foo',
      password: 'bar',
    },
  })
  expect(state.authorization.error).toEqual({
    statusCode: 401,
    code: 'unauthorized',
    description: 'Wrong email or password.',
  })
})

test('should authenticate', async () => {
  const state = await runAction(authenticate, {
    config,
    authorization: {
      username: config.test.auth0.username,
      password: config.test.auth0.password,
    },
  })
  expect(state.authorization.error).toBeNull()
  expect(state.authorization.password).toBe('')
  expect(state.authorization.token).toBeDefined()
  expect(state.authorization.authenticated).toBe(true)
})
