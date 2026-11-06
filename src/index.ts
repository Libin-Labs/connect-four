function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
function integer(value: number, min = 0, max = 1000000): number {
  if (!Number.isSafeInteger(value)) throw new RangeError('Expected safe integer');
  return finite(value, min, max);
}
export type Disc = 0 | 1 | 2;
export interface ConnectFourStatus {
  winner: 1 | 2 | null;
  nextPlayer: 1 | 2 | null;
  draw: boolean;
}
export function createConnectFour(): Disc[] {
  return Array<Disc>(42).fill(0);
}
export function connectFourStatus(board: readonly Disc[]): ConnectFourStatus {
  if (!Array.isArray(board) || board.length !== 42) throw new RangeError('42 cells required');
  let one = 0,
    two = 0;
  for (const v of board) {
    integer(v, 0, 2);
    if (v === 1) one++;
    if (v === 2) two++;
  }
  if (one !== two && one !== two + 1) throw new RangeError('Disc count mismatch');
  for (let c = 0; c < 7; c++) {
    let empty = false;
    for (let r = 5; r >= 0; r--) {
      if (board[r * 7 + c] === 0) empty = true;
      else if (empty) throw new RangeError('Floating disc');
    }
  }
  const winners = new Set<1 | 2>();
  for (let r = 0; r < 6; r++)
    for (let c = 0; c < 7; c++) {
      const v = board[r * 7 + c]!;
      if (v === 0) continue;
      for (const [dr, dc] of [
        [0, 1],
        [1, 0],
        [1, 1],
        [1, -1],
      ]) {
        const er = r + 3 * dr!,
          ec = c + 3 * dc!;
        if (er < 0 || er >= 6 || ec < 0 || ec >= 7) continue;
        let same = true;
        for (let k = 1; k <= 3; k++) if (board[(r + k * dr!) * 7 + c + k * dc!] !== v) same = false;
        if (same) winners.add(v);
      }
    }
  if (winners.size > 1) throw new RangeError('Both players winning');
  const winner = [...winners][0] ?? null;
  if ((winner === 1 && one !== two + 1) || (winner === 2 && one !== two))
    throw new RangeError('Winner turn mismatch');
  const draw = winner === null && one + two === 42;
  return { winner, nextPlayer: winner !== null || draw ? null : one === two ? 1 : 2, draw };
}
export function dropDisc(board: readonly Disc[], column: number): Disc[] {
  integer(column, 0, 6);
  const status = connectFourStatus(board);
  if (status.nextPlayer === null) throw new RangeError('Game finished');
  const out = [...board];
  for (let r = 5; r >= 0; r--)
    if (out[r * 7 + column] === 0) {
      out[r * 7 + column] = status.nextPlayer;
      return out;
    }
  throw new RangeError('Column full');
}
