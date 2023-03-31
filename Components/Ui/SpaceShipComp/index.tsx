import Link from "next/link";
import { useRouter } from "next/router";
interface Props {
  url: string;
  indx: number;
}
export default function SpaceShip({ url, indx }: Props) {
  const { query } = useRouter();
  const splitted = url.split("/");
  const id = splitted[splitted.length - 2];

  return (
    <div>
      {/* <p style={{ color: "white" }}>{title} </p>
      <p style={{ color: "white" }}>{release_date} </p>
      <p style={{ color: "white" }}>{producer} </p>
      <p style={{ color: "white" }}>{director} </p> */}
      <p>space ship : {indx + 1}</p>
      <Link href={`${query.filmId}/spaceship/${id}`}>View Post</Link>
    </div>
  );
}
