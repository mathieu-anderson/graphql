import { gql } from 'urql';

const onePageOfGenre = gql`
  query getMedia($genre: String, $perPage: Int, $page: Int) {
    Page(perPage: $perPage, page: $page) {
      pageInfo {
        currentPage
        hasNextPage
        lastPage
      }
      media(genre: $genre) {
        genres
        title {
          english
          native
        }
      }
    }
  }
`;

export { onePageOfGenre };
