import { Film } from "@/Constants/films";
import { useRouter } from "next/router";

export default function FilmComp({
  title,
  release_date,
  producer,
  director,
  url,
}: Film) {
  const { push } = useRouter();
  function onFilmClicked(filmUrl: string) {
    const splitted = filmUrl.split("/");
    const id = splitted[splitted.length - 2];
    push({
      pathname: "/film/[filmId]",
      query: { filmId: id },
    });
  }
  return (
    <div>
      <p style={{ color: "white" }}>{title} </p>
      <p style={{ color: "white" }}>{release_date} </p>
      <p style={{ color: "white" }}>{producer} </p>
      <p style={{ color: "white" }}>{director} </p>
      <button onClick={() => onFilmClicked(url)}>details</button>
    </div>
  );
}
