import { baseApi } from "../Base";
import { ArticlesResponse } from "./types";

const articleApi = baseApi.injectEndpoints({
  endpoints(build) {
    return {
      getArticles: build.query<ArticlesResponse, void>({
        query: () => ({
          url: "/articles/",
          method: "GET",
        }),
      }),
    };
  },
});

export const { useGetArticlesQuery } = articleApi;
