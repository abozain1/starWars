import errorHandler from "@/Components/Ui/errorHandler";
import FilmComp from "@/Components/Ui/FilmComp";
import { Film } from "@/Constants/films";
import api from "@/lib/axios";
import React from "react";
interface props {
  data: Film[];
  error: string;
}

const Home = ({ data, error }: props) => {
  console.log("🚀 ~ file: index.tsx:11 ~ Home ~ data:", data);
  if (!!error) {
    errorHandler(error);
  }
  return (
    <div>
      <h1>My Page</h1>
      {data.map((ele) => (
        <FilmComp {...ele} />
      ))}
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const { data } = await api.get<{ results: Film[] }>("films");
    return { props: { data: data.results } };
  } catch (e: any) {
    return { props: { data: [], error: JSON.stringify(e) } };
  }
}

export default Home;
