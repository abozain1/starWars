import { dynamicGetReq } from "@/Components/Helpers/apiHandler";
import ErrorComp from "@/Components/Ui/ErrorComp";
import FilmComp from "@/Components/Ui/FilmComp";
import Loading from "@/Components/Ui/LoadingComp";
import { Film } from "@/Constants/films";
import React from "react";
import { QueryClient, dehydrate, useQuery } from "react-query";

const Home = () => {
  const { data, isError, isLoading } = useQuery<{ results: Film[] }>(
    "films",
    () => dynamicGetReq("films")
  );
  if (!!isError) {
    return <ErrorComp />;
  }
  return (
    <div>
      <h1>My Page</h1>
      {isLoading ? (
        <Loading />
      ) : !data?.results ? (
        <p>no data...</p>
      ) : (
        data.results?.map((ele) => <FilmComp {...ele} />)
      )}
    </div>
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
