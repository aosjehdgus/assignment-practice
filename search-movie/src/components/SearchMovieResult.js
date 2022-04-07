/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const searchMoiveResultContainer = css`
  display: flex;
  padding: 1rem;
  width: 500px;
  align-items: center;
  background: rgba(0, 0, 0, 0.01);
  border-radius: 12px;
  margin: 1rem;
  box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.1) inset,
    -3px -3px 4px rgba(0, 0, 0, 0.1) inset;
`;

const imageSection = css`
  img {
    border-radius: 12px;
  }
  padding: 1rem;
  p {
    span {
      color: rgba(1, 1, 1, 0.9);
      font-weight: 700;
    }
  }
`;

const contentSection = css`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  div {
    h2 {
      font-size: 1.3rem;
      font-weight: 700;
      color: rgba(1, 1, 1, 0.7);
    }
  }
  p {
    span {
      color: rgba(1, 1, 1, 0.6);
    }
  }
`;

const SearchMoiveResult = ({
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
    <div css={searchMoiveResultContainer}>
      <section css={imageSection}>
        <img src={image} alt={title} />
        <p>
          <span>평점 : {userRating || ''}</span>
        </p>
      </section>
      <section css={contentSection}>
        <div>
          <h2>제목 : {title.replace(/<b>/gi, '').replace(/<\/b>/gi, '')}</h2>
        </div>
        <p>
          <span>출연 : {actor}</span>
        </p>
        <p>
          <span>감독 : {director}</span>
        </p>
        <p>
          <span>개봉년도: {pubDate}</span>
        </p>
      </section>
    </div>
  );
};

export default SearchMoiveResult;
