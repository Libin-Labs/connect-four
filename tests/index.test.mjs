import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('opening state', () => {
  assert.deepEqual(api.connectFourStatus(api.createConnectFour()), {
    winner: null,
    nextPlayer: 1,
    draw: false,
  });
});
test('gravity and ownership', () => {
  const b = api.createConnectFour(),
    a = api.dropDisc(b, 3),
    c = api.dropDisc(a, 3);
  assert.equal(c[38], 1);
  assert.equal(c[31], 2);
  assert.equal(b[38], 0);
});
test('horizontal win', () => {
  let b = api.createConnectFour();
  for (const c of [0, 6, 1, 6, 2, 5, 3]) b = api.dropDisc(b, c);
  assert.equal(api.connectFourStatus(b).winner, 1);
  assert.throws(() => api.dropDisc(b, 4));
});
test('vertical win', () => {
  let b = api.createConnectFour();
  for (const c of [0, 1, 0, 1, 0, 2, 0]) b = api.dropDisc(b, c);
  assert.equal(api.connectFourStatus(b).winner, 1);
});
test('invalid gravity counts and full column', () => {
  const b = api.createConnectFour();
  b[0] = 1;
  assert.throws(() => api.connectFourStatus(b));
  const c = api.createConnectFour();
  c[35] = 2;
  assert.throws(() => api.connectFourStatus(c));
  let d = api.createConnectFour();
  for (let i = 0; i < 6; i++) d = api.dropDisc(d, 0);
  assert.throws(() => api.dropDisc(d, 0));
});
test('diagonal wins in actual move sequences', () => {
  let b = api.createConnectFour();
  for (const c of [0, 1, 1, 2, 4, 2, 2, 3, 4, 3, 5, 3, 3]) b = api.dropDisc(b, c);
  assert.equal(api.connectFourStatus(b).winner, 1);
});
