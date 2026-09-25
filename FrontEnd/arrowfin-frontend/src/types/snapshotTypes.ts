export interface Position {
  instrument: string;
  netQty: number;
  avgPrice: number;
  marketPrice: number;
}

export interface Snapshot {
  positions: Position[];
  pnl: {
    realized: number;
    unrealized: number;
  };
  risk: number; // 0 - 100
}
