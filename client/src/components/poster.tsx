import { EyeOutlined } from "@ant-design/icons";
import { Button, Progress, Rate } from "antd";
import React, { memo } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { useHistory } from "react-router";
import { ROUTES } from "utils/constant";
import "../styles/components/_poster.scss";
import { MovieResponse } from "../types/movie.type";

interface IMovieDetail {
    movieDetail: MovieResponse;
}

const Poster: React.FC<IMovieDetail> = memo(({ movieDetail }) => {
    const history = useHistory();

    console.log("movieDetail", movieDetail);
    return (
        <>
            <div className="poster">
                <div className="poster__wrapper">
                    <Container>
                        <Row>
                            <Col md={4}>
                                <div className="poster__img">
                                    <img src={`${movieDetail.poster}`} alt="" />
                                </div>
                            </Col>
                            <Col md={8}>
                                <div className="poster__detail">
                                    <div className="poster__item">
                                        <h1 className="poster__text poster__text--title">{`${movieDetail.title}`}</h1>
                                        <div>
                                            <span className="poster__text poster__text--genres">
                                                {movieDetail.genres?.map((item: string) => item).join(",")}
                                            </span>
                                            <span className="poster__text poster__text--runtime">
                                                {movieDetail.runtime}m
                                            </span>
                                        </div>
                                    </div>

                                    <ul className="poster__item">
                                        <li className="poster__action poster__action--score">
                                            <Progress type="circle" percent={75} />
                                        </li>
                                        <li className="poster__action">
                                            <button className="poster__action__btn poster__action--bookmark">
                                                <i className="fa fa-bookmark"></i>
                                            </button>
                                        </li>
                                        <li className="poster__action poster__action__list">
                                            <button className="poster__action__btn poster__action--heart">
                                                <i className="fa fa-heart" />
                                            </button>
                                        </li>
                                        <li className="poster__action">
                                            <button className="poster__action__btn poster__action--star">
                                                <i className="fa fa-star" />
                                            </button>
                                            {/* <Rate
                                                allowHalf
                                                style={{ display: "block" }}
                                                className="poster__action--rating-star"
                                            /> */}
                                        </li>
                                    </ul>

                                    <div className="poster__item poster__item--overview my-4">
                                        <h3 className="poster__text poster__text--heading">Overview</h3>
                                        <p className="poster__text poster__text--desc">{movieDetail.fullplot}</p>
                                    </div>

                                    <div className="poster__item poster__item--director">
                                        <h5 className="poster__text poster__text--heading">Director</h5>
                                        <p className="poster__text poster__text--desc">
                                            {movieDetail.directors?.join(" , ")}
                                        </p>
                                    </div>

                                    <div className="poster__item poster__item--view"></div>

                                    <div className="poster__item poster__item--booking">
                                        <button
                                            className="poster__item--booking__btn"
                                            onClick={() => history.push(`${ROUTES.BOOKING}/${movieDetail._id}`)}
                                        >
                                            Booking tickets
                                        </button>
                                        <div>
                                            <EyeOutlined className="poster__item__icon" />
                                            <span className="poster__text poster__text--desc">
                                                {!!movieDetail.imdb && movieDetail.imdb?.votes + 400}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    );
});

export default Poster;
