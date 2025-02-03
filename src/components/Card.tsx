import { Link } from "react-router-dom";
import { Band, Genre } from "./BandList";

interface CardProps {
  band: Band;
  genres?: Genre[];
}

const Card: React.FC<CardProps> = ({ band, genres }) => {
  const genre = genres
    ?.filter((g) => g.code === band.genreCode)
    .map((g) => g.name)
    .join(", ");
  return (
    <li key={band.name} className="p-4 rounded-lg  bg-[#16161a]">
      <h2 className="text-xl font-semibold">{band.name}</h2>
      <p className="text-[#94a1b2]  italic"> {genre ? genre : "Goth Metal"}</p>
      <p className="text-[#94a1b2] font-medium">{band.year}</p>
      <Link
        to={`/band/${band.id}`}
        className="mt-2 inline-block text-[#fffffe] underline"
      >
        See more
      </Link>
    </li>
  );
};

export default Card;
