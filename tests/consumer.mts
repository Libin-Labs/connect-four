import { createConnectFour, dropDisc, connectFourStatus } from '@lp-labs/connect-four';
if (connectFourStatus(dropDisc(createConnectFour(), 3)).nextPlayer !== 2)
  throw new Error('Connect Four');
// @ts-expect-error invalid argument must be rejected by declarations
dropDisc(createConnectFour(), '3');
