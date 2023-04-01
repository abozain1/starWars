import { GetServerSidePropsContext } from "next";
import ErrorComp from "@/Components/Ui/ErrorComp";
import { dynamicGetReq } from "@/Components/Helpers/apiHandler";
import { QueryClient, dehydrate, useQuery } from "react-query";
import { useRouter } from "next/router";
import Loading from "@/Components/Ui/LoadingComp";
import { StarShip } from "@/Constants/ships";
import { SpaceShipView } from "./view";

export default function SpaceShipPage() {
  const { query } = useRouter();
  const { data, isError, isLoading } = useQuery<StarShip>("ship", () =>
    dynamicGetReq(`starships/${query.shipId}`)
  );

  if (!!isError) {
    return <ErrorComp />;
  }
  return isLoading ? (
    <Loading />
  ) : !data ? (
    <p>no data...</p>
  ) : (
    <>
      <SpaceShipView {...data} />
    </>
  );
}

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const { shipId } = params as { shipId: string };
  const queryClient = new QueryClient();
  try {
    await queryClient.fetchQuery("ship", () =>
      dynamicGetReq(`starships/${shipId}`)
    );
  } catch (error) {}
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
