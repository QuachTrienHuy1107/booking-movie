import { Tabs } from "antd";
import TitleNavigation from "components/common/title-navigation";
import { LoadingPage } from "components/loading-page";
import { Movies } from "components/movies";
import Poster from "components/poster";
import TopReview from "components/top-review";
import { FC, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router";
import { Settings } from "react-slick";
import { getMovieDetailAction } from "store/features/movie.slice";
import { useAppDispatch, useAppSelector } from "store/store";
import { GetDetailPayload } from "types/shared/get-detail.type";
import { ROUTES } from "utils/constant";
import "../styles/pages/_movie-detail.scss";

const { TabPane } = Tabs;

const settings: Settings = {
  arrows: false,
  dots: true,
  infinite: false,
  centerPadding: "30",

  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  touchMove: false,
};

const MovieDetail: FC = () => {
  const dispatch = useAppDispatch();
  const { _id } = useParams() as GetDetailPayload;
  const { movieDetail, isLoading, moviePagination } = useAppSelector(state => state.movieSlice);

  useEffect(() => {
    dispatch(getMovieDetailAction({ _id }));
  }, [_id, dispatch]);

  const movies = moviePagination && {
    ...moviePagination,
    movies: moviePagination.movies.filter(movie => movie._id !== _id),
  };

  return (
    <div className="movie-detail">
      {(!!isLoading && <LoadingPage />) || (
        <>
          <Poster movieDetail={movieDetail} />
          <Container>
            <TopReview _id={_id} />
            <div className="spacing"></div>
            <div style={{ paddingRight: 10 }}>
              <TitleNavigation
                title="Movie Recommend"
                subTitle="See all"
                linkTo={ROUTES.MOVIELIST}
              />
            </div>

            <Movies moviePagination={movies} settings={settings} />
          </Container>
        </>
      )}
    </div>
  );
};
export default MovieDetail;
