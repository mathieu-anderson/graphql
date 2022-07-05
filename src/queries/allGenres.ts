import { gql } from 'urql';

const allGenres = gql`
  query allGenres {
    GenreCollection
  }
`;

export { allGenres };
