import { dynamicGetReq } from "@/Components/Helpers/apiHandler";
import ErrorComp from "@/Components/Ui/ErrorComp";
import FilmComp from "@/Components/Ui/FilmComp";
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
    <p>no data ...</p>
  ) : (
    <>
      <FilmComp {...data} />
      {data.starships?.map((url, indx) => (
        <SpaceShip indx={indx} url={url} />
      ))}
    </>
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
