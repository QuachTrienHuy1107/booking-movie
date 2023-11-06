import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { FC, useRef } from "react";
import Slider, { Settings } from "react-slick";
import { MoviePaginationResponse, MovieResponse } from "types/movie.type";
import "../styles/components/_movies.scss";
import { MovieCard } from "./movie-card";

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
  const slider = useRef(null);

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
