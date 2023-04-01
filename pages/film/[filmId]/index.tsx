import { dynamicGetReq } from "@/Components/Helpers/apiHandler";
import ErrorComp from "@/Components/Ui/ErrorComp";
import LandingLayout from "@/Components/Ui/LandingLayout";
import Loading from "@/Components/Ui/LoadingComp";
import SpaceShip from "@/Components/Ui/SpaceShipComp";
import { Film } from "@/Constants/films";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { QueryClient, dehydrate, useQuery } from "react-query";

export default function FilmPage() {
  const { query } = useRouter();
  const { data, isError, isLoading } = useQuery<Film>("film", () =>
    dynamicGetReq(`films/${query.filmId}`)
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
      badge={data.title}
      title={data.director}
      description={data.opening_crawl}
    >
      {data.starships.map((url) => {
        const splitted = url.split("/");
        const id = splitted[splitted.length - 2];
        return <SpaceShip id={id} />;
      })}
    </LandingLayout>
  );
}
export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const { filmId } = params as { filmId: string };
  const queryClient = new QueryClient();
  try {
    await queryClient.fetchQuery("film", () =>
      dynamicGetReq(`films/${filmId}`)
    );
  } catch (error) {}
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
