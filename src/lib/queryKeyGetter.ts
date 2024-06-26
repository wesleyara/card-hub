import { CardsResponse, IUser, TradesResponse } from "~/types";

import { api } from "./axios";
import { endpoints } from "./constants";

// classe responsável por realizar as requisições de dados
export class QueryKeyGetter {
  async requestCards() {
    try {
      const response = await api.get<CardsResponse>(
        `${endpoints.cards}?rpp=100&page=1`,
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async requestTrades() {
    try {
      const response = await api.get(`${endpoints.trades}?rpp=100&page=1`);
      return response.data.list as TradesResponse[];
    } catch (error) {
      console.error(error);
    }
  }

  async requestMe(token: string) {
    try {
      const response = await api.get<IUser>(endpoints.me, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
