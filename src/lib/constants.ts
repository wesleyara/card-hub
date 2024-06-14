// Definindo as rotas da API
export const endpoints = {
  register: "/register", // POST { "name": "Example", "email": "example@test.com", "password": "123456" }
  login: "/login", // POST { "email": "example@test.com", "password": "123456" }
  me: "/me", // GET
  cards: "/cards", // GET ?rpp=10&page=1
  addCards: "/me/cards", // POST { "cardIds": [ "123456" ] }
  userCards: "/me/cards", // GET
  addTrades: "/trades", // POST { "cards": [ { "cardId": "card-uuid", "type": "OFFERING" }, { "cardId": "new-card-uuid", "type": "RECEIVING" } ] }
  trades: "/trades", // GET ?rpp=10&page=1
  deleteTrade: "/trades", // DELETE /:id
};

// Definindo as rotas da aplicação
export const routes = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Mercado",
    path: "/mercado",
  },
];
