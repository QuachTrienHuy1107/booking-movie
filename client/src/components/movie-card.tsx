import { Card } from "antd";
import moment from "moment";
import React, { memo } from "react";
import { Link } from "react-router-dom";
import { MovieResponse } from "types/movie.type";
import { ROUTES } from "utils/constant";
import "../styles/components/_movie-card.scss";

interface IMovieCard {
  movie: MovieResponse;
  isHome?: boolean;
}

export const MovieCard: React.FC<IMovieCard> = memo(({ movie, isHome }): JSX.Element => {
  return (
    <div className={`movie ${isHome ? "movie-recommend" : ""}`} key={movie._id}>
      <Card
        hoverable={false}
        bordered={false}
        cover={
          <div className="movie__poster">
            <Link
              to={{
                pathname: `${ROUTES.MOVIEDETAIL}/${movie._id}`,
              }}
            >
              <img className="movie__poster--img" alt="" src={movie.poster} />
            </Link>
          </div>
        }
      >
        <div className="movie__info">
          <Link to={{ pathname: `${ROUTES.MOVIEDETAIL}/${movie._id}` }}>
            <h1 className="movie__content movie__content--title">{movie.title}</h1>
          </Link>
          <span className="movie__content movie__content--genres ">
            {moment(movie.released).format("MMM DD, YYYY")}
          </span>
        </div>
      </Card>
    </div>
  );
});
