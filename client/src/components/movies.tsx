import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import usePagination from "hooks/usePagination";
import { FC, useEffect, useRef } from "react";
import Slider, { Settings } from "react-slick";
import { getPaginateMoviesAction } from "store/features/movie.slice";
import { useAppDispatch } from "store/store";
import { MoviePaginationResponse, MovieResponse } from "types/movie.type";
import "../styles/components/_movies.scss";
import { MovieCard } from "./movie-card";

interface IMovie {
  moviePagination: MoviePaginationResponse;
  settings: Settings;
}

export const Movies: FC = ({ moviePagination, settings }: IMovie) => {
  const slider = useRef(null);
  const dispatch = useAppDispatch();
  const { resPagination } = usePagination(1, 10);

  useEffect(() => {
    if (!!moviePagination && moviePagination.movies.length > 0) return;
    const data = {
      ...resPagination,
    };
    dispatch(getPaginateMoviesAction(data));
  }, [dispatch, moviePagination, resPagination]);

  return (
    <div className="movies">
      <div className="arrow arrow--left">
        <LeftOutlined onClick={() => slider.current?.slickPrev()} />
      </div>
      <Slider {...settings} ref={slider}>
        {moviePagination.movies?.map((movie: MovieResponse) => (
          <div key={movie._id} className="movies__item">
            <MovieCard movie={movie} />
          </div>
        ))}
      </Slider>
      <div className="arrow arrow--right">
        <RightOutlined onClick={() => slider.current?.slickNext()} />
      </div>
    </div>
  );
};
