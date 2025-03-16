"use client";

import React from "react";
import { useGetCompanyChallengesQuery } from "@/api/Company";
import ChallengeCard from "@/components/molecules/company-challenge-card";
import { Heading } from "@/components/atoms/heading";
import { ChallengesBg, ChallengesSVG } from "@/assets/backgrounds";
import { RequestHandler } from "@/components/atoms/request-handler";
import { motion } from "framer-motion";
import {
  fadeIn,
  staggerTransition,
  textVariant,
  viewportConfig,
} from "@/lib/motion";

export const CompanyChallengeList = () => {
  const { data, isLoading, error } = useGetCompanyChallengesQuery();

  return (
    <section className="bg-background-gray">
      <article className="max-w-[1280px] m-auto relative py-4 md:py-16 lg:py-28 z-10 overflow-hidden">
        <RequestHandler isLoading={isLoading} error={error} data={data}>
          <Heading as="h2" className="text-center">
            {data?.title}
          </Heading>
          <article className="relative">
            <article className="grid grid-cols-1 lg:grid-cols-2 place-items-center gap-y-12 mt-5 lg:mt-14">
              {data?.items.map((challenge, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn("up", "spring", index * 0.2)}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewportConfig}
                  transition={staggerTransition(index)}
                >
                  <ChallengeCard
                    idx={index}
                    logo={challenge.logo}
                    title={challenge.title}
                    description={challenge.description}
                  />
                </motion.div>
              ))}
            </article>
            <ChallengesSVG className="absolute top-[150px] left-[405px] hidden xl:flex" />
            <ChallengesBg className="hidden lg:block absolute top-7 mx-auto w-full -z-10" />
          </article>
        </RequestHandler>
      </article>
    </section>
  );
};
