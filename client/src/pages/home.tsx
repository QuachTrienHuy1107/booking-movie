import TitleNavigation from "components/common/title-navigation";
import {Movies} from "components/movies";
import usePagination from "hooks/usePagination";
import {FC, useEffect} from "react";
import {Container} from "react-bootstrap";
import TitleNavigationSkeleton from "skeleton/components/title-navigation.skeleton";
import MovieSkeleton from "skeleton/pages/movies.skeleton";
import {getPaginateMoviesAction} from "store/features/movie.slice";
import {useAppDispatch, useAppSelector} from "store/store";
import {ROUTES} from "utils/constant";
import "../styles/pages/_home.scss";

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const {moviePagination, isLoading} = useAppSelector((state) => state.movieSlice);
  const {resPagination} = usePagination(1, 20);

  useEffect(() => {
    const data = {
      ...resPagination,
    };
    dispatch(getPaginateMoviesAction(data));
  }, [dispatch, resPagination]);

  const renderSkeleton = () => {
    return (
      <>
        <div className="heading-title--hasFence">
          <TitleNavigationSkeleton />
        </div>
        <MovieSkeleton item={4} />
      </>
    );
  };

  const renderMovies = () => {
    return (
      <Container>
        {isLoading ? renderSkeleton() : (
          <>
            <div>
              <TitleNavigation title="Now Showing" linkTo={ROUTES.MOVIELIST} subTitle="See all" />
            </div>
            <Movies moviePagination={moviePagination} />
          </>
        )}
      </Container>
    );
  };

  return (
    <div className="home">
      <Container>
        {renderMovies()}
      </Container>
    </div>
  );
};
export default Home;
