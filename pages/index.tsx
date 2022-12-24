/* eslint-disable react/no-unescaped-entities */
import type { NextPage } from "next";
import React from "react";
import { CarouselCrew } from "../components/carousel-crew";
import Page from "../components/layout/page";

const Home: NextPage = () => {
  return (
    <Page>
      <CarouselCrew />
      yo
    </Page>
  );
};

export default Home;
