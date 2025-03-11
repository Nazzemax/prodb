import { url } from "inspector";
import { baseApi } from "../Base";
import { Type } from "../Types/types";
import { ParallaxData } from "./types";

export const businessTypes = baseApi.injectEndpoints({
    endpoints(build) {
        return {
            getBusinessTypes: build.query<Type[], void>({
                query: () => ({
                    url: "/business-types/",
                }),
            }),
            getBusinessCards: build.query<ParallaxData, void>({
                query: () => ({
                    url: "/business-cards/",
                }),
            }),
        };
    },
});

export const { useGetBusinessTypesQuery, useGetBusinessCardsQuery } =
  businessTypes;
