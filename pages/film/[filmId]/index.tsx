import errorHandler from "@/Components/Ui/errorHandler";
import FilmComp from "@/Components/Ui/FilmComp";
import SpaceShip from "@/Components/Ui/SpaceShipComp";
import { Film } from "@/Constants/films";
import api from "@/lib/axios";
import { GetServerSidePropsContext } from "next";
interface props {
  data: Film;
  error: string;
}

export default function FilmPage({ data, error }: props) {
  console.log("🚀 ~ file: index.tsx:12 ~ FilmPage ~ data:", data);
  if (!!error) errorHandler(error);

  return (
    <>
      <FilmComp {...data} />
      {!!data.starships &&
        data.starships.map((url, indx) => <SpaceShip indx={indx} url={url} />)}
    </>
  );
}
export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const { filmId } = params as { filmId: string };

  try {
    const { data } = await api.get<Film>(`films/${filmId}`);
    return { props: { data: data } };
  } catch (e: any) {
    return { props: { data: {}, error: JSON.stringify(e) } };
  }
}
