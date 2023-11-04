import { Tabs } from "antd";
import { FC } from "react";
import Slider, { Settings } from "react-slick";
import { MoviePaginationResponse, MovieResponse } from "types/movie.type";
import "../styles/components/_movies.scss";
import { MovieCard } from "./movie-card";

const { TabPane } = Tabs;

let settings: Settings = {
  arrows: false,
  centerMode: true,
  infinite: true,
  centerPadding: "0",
  slidesToShow: 1,
  speed: 400,
  rows: 2,
  slidesPerRow: 5,
  touchMove: false,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 1,
        slidesPerRow: 3,
        initialSlide: 3,
      },
    },
    {
      breakpoint: 756,
      settings: {
        slidesToShow: 1,
        slidesPerRow: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 2,
        slidesPerRow: 1,
        slidesToScroll: 1,
        rows: 2,
      },
    },
  ],
};

interface IMovie {
  moviePagination: MoviePaginationResponse;
}

export const Movies: FC = ({ moviePagination }: IMovie) => {
  return (
    <div className="movies">
      <Slider {...settings}>
        {moviePagination.movies?.map((movie: MovieResponse) => (
          <div key={movie._id} className="movies__item">
            <MovieCard movie={movie} />
          </div>
        ))}
      </Slider>
    </div>
  );
};
