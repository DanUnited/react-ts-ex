export interface IRound {
  date: string;
  holes: string;
  players: string;
  time: string;
  price: string;
  cart: string;
  trade: boolean;
  displayed: boolean;
}

export interface IRoundList {
  [key: string]: IRound[];
}
