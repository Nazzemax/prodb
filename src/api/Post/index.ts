import { baseApi } from "../Base";
import { Post, PostsResponse } from "./types";

export const postApi = baseApi.injectEndpoints({
  endpoints(build) {
    return {
      getPosts: build.query<PostsResponse, void>({
        query: () => ({
          url: "/posts/",
        }),
      }),
      getPostById: build.query<Post, string>({
        query: (id) => ({
          url: `/posts/${id}/`,
        }),
      }),
    };
  },
});

export const { useGetPostsQuery, useGetPostByIdQuery } = postApi;
