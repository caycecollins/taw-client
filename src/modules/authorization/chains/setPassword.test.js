import setPassword from './setPassword'

test('should set password', async () => {
  const state = await runChain(setPassword, { password: 'foo' }, { authorization: {} })
  expect(state).toEqual({ authorization: { password: 'foo' } })
})
