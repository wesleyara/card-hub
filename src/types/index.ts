// ----------------- API GET /me -----------------

export interface Card {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  cards: Card[];
}

// ----------------- API POST /register -----------------

export interface RegisterResponse {
  userId: string;
}

// ----------------- API POST /login -----------------

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

// ----------------- API GET /cards -----------------

export interface CardsResponse {
  list: Card[];
}

// ----------------- API POST /trades -----------------

export interface TradeCard {
  id: string;
  cardId: string;
  tradeId: string;
  type: string;
  card: Card;
}

export interface UserName {
  name: string;
}

export interface TradesResponse {
  id: string;
  userId: string;
  createdAt: Date;
  user: UserName;
  tradeCards: TradeCard[];
}
