import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";

interface Band {
  id: string;
  name: string;
  genreCode: string;
  year: number;
  bio?: string;
  members?: BandMember[];
}

interface Album {
  id: string;
  name: string;
  bandId: string;
  year: number;
}

interface BandMember {
  id: string;
  name: string;
}

interface Genre {
  code: string;
  name: string;
}

const fetchBand = async (id: string): Promise<Band> => {
  const response = await fetch(
    `https://my-json-server.typicode.com/improvein/dev-challenge/bands/${id}`
  );
  if (!response.ok) {
    throw new Error("Error fetching band details");
  }
  return response.json();
};

const fetchAlbums = async (bandId: string): Promise<Album[]> => {
  const response = await fetch(
    `https://my-json-server.typicode.com/improvein/dev-challenge/albums`
  );
  if (!response.ok) {
    throw new Error("Error fetching albums");
  }
  const albums: Album[] = await response.json();
  return albums.filter((album) => String(album.bandId) === bandId);
};

const fetchGenres = async (): Promise<Genre[]> => {
  const response = await fetch(
    `https://my-json-server.typicode.com/improvein/dev-challenge/genre`
  );
  if (!response.ok) {
    throw new Error("Error fetching genres");
  }
  return response.json();
};

export default function BandDetail() {
  const { id } = useParams<{ id: string }>();

  const {
    data: band,
    error: bandError,
    isLoading: bandLoading,
  } = useQuery<Band>({
    queryKey: ["band", id],
    queryFn: () => fetchBand(id!),
    enabled: !!id,
  });

  const {
    data: albums,
    error: albumsError,
    isLoading: albumsLoading,
  } = useQuery<Album[]>({
    queryKey: ["albums", id],
    queryFn: () => fetchAlbums(id!),
    enabled: !!id,
  });

  const {
    data: genres,
    error: genresError,
    isLoading: genresLoading,
  } = useQuery<Genre[]>({
    queryKey: ["genres"],
    queryFn: fetchGenres,
  });

  const genreName =
    genres?.find((genre) => genre.code === band?.genreCode)?.name ||
    "Goth Metal";

  if (bandLoading)
    return <p className="text-center text-gray-500">Loading details...</p>;
  if (bandError)
    return (
      <p className="text-center text-red-500">Error: {bandError.message}</p>
    );

  return (
    <div className="max-w-2xl mx-auto p-6 text-color-white shadow-md rounded-lg bg-[#16161a] w-[90%]">
      <Link
        to="/"
        className="mt-4 text-white-500 underline mb-2 flex items-center gap-1"
      >
        <svg
          height="21"
          viewBox="0 0 21 21"
          width="21"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            fill="none"
            fillRule="evenodd"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(3 6)"
          >
            <path d="m4.499.497-3.999 4.002 4 4.001" />
            <path d="m13.5 4.5h-13" />
          </g>
        </svg>
        Go back
      </Link>
      <h1 className="text-3xl font-bold">{band?.name}</h1>
      <p className="italic text-[#94a1b2]">
        {genresLoading ? "Loading genre..." : genreName}
      </p>
      <p className="text-[#94a1b2] font-medium">{band?.year}</p>

      <h2 className="text-2xl font-semibold mt-6">Albums</h2>
      {albumsLoading && <p className="text-gray-500">Loading albums...</p>}
      {albumsError && (
        <p className="text-red-500">Error: {albumsError.message}</p>
      )}
      {albums && albums.length > 0 ? (
        <ul className="mt-2 space-y-2">
          {albums.map((album) => (
            <li key={album.name} className="border-b py-2">
              <p className="text-lg italic">{album.name}</p>
              <p className="text-[#94a1b2] font-medium"> {album.year}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No hay álbumes disponibles.</p>
      )}

      <h2 className="text-2xl font-semibold mt-6">Members</h2>
      {band?.members && band.members.length > 0 ? (
        <ul className="mt-2 space-y-2">
          {band.members.map((member) => (
            <li key={member.name} className=" py-2">
              <p className="text-lg italic">{member.name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No members available.</p>
      )}
    </div>
  );
}
