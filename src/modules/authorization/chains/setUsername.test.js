import setUsername from './setUsername'

test('should set username', async () => {
  const state = await runChain(setUsername, { username: 'foo' }, { authorization: {} })
  expect(state).toEqual({ authorization: { username: 'foo' } })
})
