import { dynamicGetReq } from "@/Components/Helpers/apiHandler";
import ErrorComp from "@/Components/Ui/ErrorComp";
import FilmComp from "@/Components/Ui/FilmComp";
import Loading from "@/Components/Ui/LoadingComp";
import { Film } from "@/Constants/films";
import React from "react";
import { QueryClient, dehydrate, useQuery } from "react-query";
import LandingLayout from "@/Components/Ui/LandingLayout";

const Home = () => {
  const { data, isError, isLoading } = useQuery<{ results: Film[] }>(
    "films",
    () => dynamicGetReq("films")
  );
  if (!!isError) {
    return <ErrorComp />;
  }

  return isLoading ? (
    <Loading />
  ) : !data ? (
    <p>no data...</p>
  ) : (
    <LandingLayout
      badge="Star Wars"
      title="Learn effortlessly about any star wars movie"
    >
      {data.results.map((film) => (
        <FilmComp {...film} />
      ))}
    </LandingLayout>
  );
};

export async function getStaticProps() {
  const queryClient = new QueryClient();
  try {
    await queryClient.fetchQuery("films", () => dynamicGetReq("films"));
  } catch (error) {}
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Home;
