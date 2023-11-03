import usePagination from "hooks/usePagination";
import React from "react";
import Slider, {Settings} from "react-slick";
import {getPaginateMoviesAction} from "store/features/movie.slice";
import {useAppDispatch, useAppSelector} from "store/store";
import {MovieResponse} from "types/movie.type";
import "../styles/components/_movie-recommend.scss";
import {MovieCard} from "./movie-card";

const settings: Settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  touchMove: false
};

interface IMovieRec {
  isHome?: boolean;
  movieRec?: MovieResponse[];
}

const MovieRecommend: React.FC<IMovieRec> = ({movieRec, isHome}) => {
  const dispatch = useAppDispatch();
  const {isLoading, moviePagination} = useAppSelector((state) => state.movieSlice);
  const {resPagination} = usePagination(1, 10);

  React.useEffect(() => {
    if (!!movieRec) return;
    const data = {
      ...resPagination,
    };
    dispatch(getPaginateMoviesAction(data));
  }, [dispatch, movieRec, resPagination]);

  return (
    <div className={`movie-rec ${!isHome ? "movie-rec--detail" : ""}`}>
      <Slider {...settings}>
        {moviePagination.movies?.map((movie: MovieResponse) => (
          <div key={movie._id} className={!isHome ? "movie-rec--detail" : ""}>
            <MovieCard isHome={isHome} movie={movie} />
          </div>
        ))}
      </Slider>

      <div className={!isHome ? "fence" : "fence fence--home"}></div>
    </div>
  );
};

export default MovieRecommend;
