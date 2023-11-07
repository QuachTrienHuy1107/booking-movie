import TitleNavigation from "components/common/title-navigation";
import { Movies } from "components/movies";
import usePagination from "hooks/usePagination";
import { FC, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Settings } from "react-slick";
import TitleNavigationSkeleton from "skeleton/components/title-navigation.skeleton";
import MovieSkeleton from "skeleton/pages/movies.skeleton";
import { getPaginateMoviesAction } from "store/features/movie.slice";
import { useAppDispatch, useAppSelector } from "store/store";
import { ROUTES } from "utils/constant";
import "../styles/pages/_home.scss";

const settings: Settings = {
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

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const { moviePagination, isLoading } = useAppSelector(state => state.movieSlice);
  const { resPagination } = usePagination(1, 20);

  useEffect(() => {
    if (moviePagination.movies.length > 0) return;
    const data = {
      ...resPagination,
    };
    dispatch(getPaginateMoviesAction(data));
  }, [dispatch, moviePagination, resPagination]);

  const renderSkeleton = () => {
    return (
      <>
        <TitleNavigationSkeleton />
        <MovieSkeleton />
      </>
    );
  };

  const renderMovies = () => {
    return (
      <>
        {isLoading ? (
          renderSkeleton()
        ) : (
          <>
            <TitleNavigation title="Now Showing" linkTo={ROUTES.MOVIELIST} subTitle="See all" />
            <Movies moviePagination={moviePagination} settings={settings} />
          </>
        )}
      </>
    );
  };

  return (
    <div className="home">
      <Container>{renderMovies()}</Container>
    </div>
  );
};
export default Home;
