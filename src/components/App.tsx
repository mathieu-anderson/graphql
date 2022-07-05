import { useQuery } from 'urql';
import { allGenres, onePageOfGenre } from '../queries';
import './App.css';
import { useState, useCallback } from 'react';

function App() {
  const [selectedGenre, setSelectedGenre] = useState('action');
  const [selectedPage, setSelectedPage] = useState(1);

  const [onePageOfGenreResult] = useQuery({
    query: onePageOfGenre,
    variables: { genre: selectedGenre, perPage: 10, page: selectedPage },
  });
  const [allGenresResult] = useQuery({
    query: allGenres,
    requestPolicy: 'cache-first',
  });

  if (onePageOfGenreResult.error || allGenresResult.error) {
    return (
      <div>
        Error:
        {onePageOfGenreResult.error?.message || allGenresResult.error?.message}
      </div>
    );
  }

  const changePage = useCallback(
    (nextPage: number) => {
      if (onePageOfGenreResult.fetching) {
        return;
      }

      setSelectedPage(nextPage);
    },
    [onePageOfGenreResult.fetching]
  );

  return (
    <div className="App">
      <select
        onChange={(selected) => {
          setSelectedGenre(selected.currentTarget.value);
          setSelectedPage(1);
        }}
        value={selectedGenre}
      >
        {allGenresResult?.data?.GenreCollection.map((genre: string) => (
          <option id={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      {
        <ul>
          {onePageOfGenreResult.fetching
            ? 'loading'
            : onePageOfGenreResult?.data?.Page?.media.map((item: any) => (
                <li id={item.title.english}>
                  {item.title.english} (${item.title.native})
                </li>
              ))}
        </ul>
      }
      <button
        disabled={onePageOfGenreResult?.data?.Page?.pageInfo.currentPage === 1}
        onClick={() =>
          changePage(onePageOfGenreResult?.data?.Page?.pageInfo.currentPage - 1)
        }
      >
        Previous
      </button>
      <button
        disabled={!onePageOfGenreResult?.data?.Page?.pageInfo.hasNextPage}
        onClick={() =>
          changePage(onePageOfGenreResult?.data?.Page?.pageInfo.currentPage + 1)
        }
      >
        Next
      </button>
      <div>
        Page {onePageOfGenreResult?.data?.Page?.pageInfo.currentPage} /{' '}
        {onePageOfGenreResult?.data?.Page?.pageInfo.lastPage}
      </div>
    </div>
  );
}

export default App;
