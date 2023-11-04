import Skeleton from "components/shared/skeleton";
import "../../styles/components/_movie-card.scss";
import '../../styles/components/_movies.scss';

interface IMovieSkeleton {
  item: number;
}

export default function MovieSkeleton({item = 10}: IMovieSkeleton) {
  const dummyMovies = new Array(item).fill(null);

  return (
    <div className='movies__skeleton'>
      {dummyMovies.map((_, index) => (
        <div className="movie" key={index}>
          <div className="movie__poster">
            <Skeleton height={375} width={'100%'} block />
          </div>
          <div className="movie__info">
            <p className="movie__content movie__content--title">
              <Skeleton width={'70%'} block />
            </p>
            <p className='className="movie__content movie__content--genres "'>
              <Skeleton width={'50%'} />
            </p>
          </div>
        </div>

      ))}
    </div>
  );
}
