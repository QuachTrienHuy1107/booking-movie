import { Tabs } from "antd";
import usePagination from "hooks/usePagination";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import { getPaginateMoviesAction } from "store/features/movie.slice";
import { useAppDispatch, useAppSelector } from "store/store";
import { MovieResponse } from "types/movie.type";
import { ROUTES } from "utils/constant";
import "../styles/components/_movies.scss";
import TitleNavigation from "./common/title-navigation";
import { MovieCard } from "./movie-card";

const { TabPane } = Tabs;

const settings = {
    arrows: true,
    centerMode: true,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 1,
    speed: 400,
    rows: 5,

    slidesPerRow: 5,
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

export const Movies: React.FC = () => {
    const dispatch = useAppDispatch();
    const { moviePagination, isLoading } = useAppSelector((state) => state.movieSlice) as any;
    const { resPagination } = usePagination(1, 20);

    console.log("moviePagination", moviePagination);

    React.useEffect(() => {
        const data = {
            ...resPagination,
        };
        dispatch(getPaginateMoviesAction(data));
    }, [dispatch, resPagination]);

    return (
        <div className="movies">
            <Row>
                <Col>
                    <TitleNavigation title="Now Showing" linkTo={ROUTES.MOVIELIST} subTitle="See all >" />
                    <Slider {...settings}>
                        {moviePagination.movies?.map((movie: MovieResponse) => (
                            <div key={movie._id} className="movies__item">
                                <MovieCard movie={movie} />
                            </div>
                        ))}
                    </Slider>
                </Col>
            </Row>
        </div>
    );
};
