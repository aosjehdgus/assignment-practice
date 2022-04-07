/* eslint-disable no-nested-ternary */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FcSearch } from '@react-icons/all-files/fc/FcSearch';
import { useState } from 'react';
import axios from 'axios';
import SearchMoiveResult from './SearchMovieResult';

const headerContainer = css`
  display: flex;
  justify-content: center;
  padding: 1rem;
  h1 {
    font-size: 2rem;
    color: rgba(1, 1, 1, 0.7);
  }
`;

const titleContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const inputContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  input {
    padding: 0.5rem;
    border: 0;
    border-bottom: 1px solid black;
  }
  button {
    background: inherit;
    border: 0;
    svg {
      padding: 0.5rem;
    }
  }
`;

const searchContainer = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Search = () => {
  const [search, setSearch] = useState({
    isLoading: true,
    value: '',
    movies: [],
  });

  const { value, movies, isLoading } = search;

  const getSearchMovie = async e => {
    e.preventDefault();

    const NAVER_CLIENT_ID = 'PH9_B0EkisELEb_RZgSJ';
    const NAVER_CLIENT_SECRET = '4k0Xld6JPB';

    try {
      if (value === '') {
        setSearch({ movies: [], isLoading: false });
      } else {
        const {
          data: { items },
        } = await axios.get('/api/v1/search/movie.json', {
          params: {
            query: value,
            display: 20,
          },
          headers: {
            'X-Naver-Client-Id': NAVER_CLIENT_ID,
            'X-Naver-Client-Secret': NAVER_CLIENT_SECRET,
          },
        });
        if (!items) {
          setSearch({ movies: [], isLoading: false });
        }
        setSearch({ movies: items, isLoading: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = e => {
    setSearch({ value: e.target.value });
  };

  return (
    <div>
      <header css={headerContainer}>
        <form onSubmit={getSearchMovie}>
          <div css={titleContainer}>
            <h1>영화 검색</h1>
          </div>
          <div css={inputContainer}>
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={value || ''}
              onChange={e => handleChange(e)}
            />
            <button type="submit">
              <FcSearch size={20} />
            </button>
          </div>
        </form>
      </header>
      <article css={searchContainer}>
        {movies?.map(
          ({
            title,
            actor,
            director,
            image,
            link,
            pubDate,
            subtitle,
            userRating,
          }) => {
            return (
              <SearchMoiveResult
                key={link}
                title={title}
                actor={actor}
                director={director}
                image={image}
                pubDate={pubDate}
                subtitle={subtitle}
                userRating={userRating}
              />
            );
          },
        )}
      </article>
    </div>
  );
};

export default Search;
