import { fetchData } from "../Base/baseApi";
import { Post, PostsResponse } from "./types";
import { getLocale } from "next-intl/server";

export async function getPosts() {
    const locale = await getLocale();
    return fetchData<PostsResponse>("/posts/", locale);
}

export async function getPostById(id: string) {
    const locale = await getLocale();
    return fetchData<Post>(`/posts/${id}/`, locale);
}
