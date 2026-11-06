# @lp-labs/connect-four

Gravity-aware standard Connect Four status and immutable moves.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/connect-four
```

## Working example

```js
import { createConnectFour, dropDisc, connectFourStatus } from '@lp-labs/connect-four';
if (connectFourStatus(dropDisc(createConnectFour(), 3)).nextPlayer !== 2)
  throw new Error('Connect Four');
```

CommonJS: `const api = require('@lp-labs/connect-four')`.

## Behavior, customization and limits

createConnectFour returns42 zero cells,6rows x7columns top-row first, disc1 starts. connectFourStatus validates cell0/1/2, gravity, count parity, consistent winner turn and no simultaneous winners; returns winner1/2|null,nextPlayer1/2|null,draw. dropDisc(board,column) chooses derived turn, column0..6, rejects full/finished boards. Validates static state consistency, not proof of complete historical reachability. O(42), no AI or custom board.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export type Disc = 0 | 1 | 2;
export interface ConnectFourStatus {
  winner: 1 | 2 | null;
  nextPlayer: 1 | 2 | null;
  draw: boolean;
}
export declare function createConnectFour(): Disc[];
export declare function connectFourStatus(board: readonly Disc[]): ConnectFourStatus;
export declare function dropDisc(board: readonly Disc[], column: number): Disc[];
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
