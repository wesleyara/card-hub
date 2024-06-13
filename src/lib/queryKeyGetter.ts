import { CardsResponse, IUser } from "~/types";

import { api } from "./axios";
import { endpoints } from "./constants";

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
