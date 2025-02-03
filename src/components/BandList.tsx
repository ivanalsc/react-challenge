import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Card from "./Card";

export interface Band {
  id: string;
  name: string;
  genreCode: string;
  year: number;
}

export interface Genre {
  code: string;
  name: string;
}

const fetchBands = async (): Promise<Band[]> => {
  const response = await fetch(
    "https://my-json-server.typicode.com/improvein/dev-challenge/bands"
  );
  if (!response.ok) {
    throw new Error("Error fetching bands");
  }
  return response.json();
};

const fetchGenres = async (): Promise<Genre[]> => {
  const response = await fetch(
    "https://my-json-server.typicode.com/improvein/dev-challenge/genre"
  );
  if (!response.ok) {
    throw new Error("Error fetching genres");
  }
  return response.json();
};

export default function BandList() {
  const {
    data: bands,
    error: bandsError,
    isLoading: bandsLoading,
  } = useQuery({
    queryKey: ["bands"],
    queryFn: fetchBands,
  });

  const {
    data: genres,
    error: genresError,
    isLoading: genresLoading,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
  });

  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [orderBy, setOrderBy] = useState("name");

  if (bandsLoading || genresLoading)
    return <p className="text-center text-gray-500">Loading...</p>;
  if (bandsError)
    return (
      <p className="text-center text-red-500">Error: {bandsError.message}</p>
    );
  if (genresError)
    return (
      <p className="text-center text-red-500">Error: {genresError.message}</p>
    );

  const filteredBands = bands
    ? bands
        .filter((band) =>
          band.name.toLowerCase().includes(search.toLowerCase())
        )
        .filter((band) =>
          selectedGenre ? band.genreCode === selectedGenre : true
        )
        .sort((a, b) => {
          if (orderBy === "name") {
            return a.name.localeCompare(b.name);
          } else if (orderBy === "year") {
            return a.year - b.year;
          }
          return 0;
        })
    : [];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Bands</h1>
      <div className="mb-4 flex gap-2 flex-col md:flex-row">
        <input
          type="text"
          placeholder="Search band..."
          className="p-2 border rounded w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-2 border rounded"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">All genres</option>
          {genres?.map((genre) => (
            <option key={genre.code} value={genre.code}>
              {genre.name}
            </option>
          ))}
        </select>
        <select
          className="p-2 border rounded"
          value={orderBy}
          onChange={(e) => setOrderBy(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="year">Sort by Year</option>
        </select>
      </div>
      {filteredBands.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-9/10 m-auto">
          {filteredBands.map((band) => (
            <Card key={band.id} band={band} genres={genres} />
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">
          There are no bands matching your search
        </p>
      )}
    </div>
  );
}
