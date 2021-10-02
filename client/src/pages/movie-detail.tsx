import { Tabs } from "antd";
import TitleNavigation from "components/common/title-navigation";
import MovieRecommend from "components/movie-recommend";
import Poster from "components/poster";
import TopReview from "components/top-review";
import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router";
import { getMovieDetailAction } from "store/features/movie.slice";
import { useAppDispatch, useAppSelector } from "store/store";
import { GetDetailPayload } from "types/shared/get-detail.type";
import { ROUTES } from "utils/constant";
import "../styles/pages/_movie-detail.scss";

const { TabPane } = Tabs;

const MovieDetail: React.FC = () => {
    const dispatch = useAppDispatch();
    const { _id } = useParams() as GetDetailPayload;
    const { movieDetail } = useAppSelector((state) => state.movieSlice);

    React.useEffect(() => {
        dispatch(getMovieDetailAction({ _id }));
    }, [_id, dispatch]);

    console.log("movieDetail", movieDetail);

    return (
        <>
            <Poster movieDetail={movieDetail} />
            <Container>
                <TopReview _id={_id} />
                <div className="spacing"></div>

                <TitleNavigation title="Movie Recommend" subTitle="See all" linkTo={ROUTES.MOVIELIST} />
                <MovieRecommend movieRec={movieDetail.movieRecommend} />
            </Container>
        </>
    );
};
export default MovieDetail;
