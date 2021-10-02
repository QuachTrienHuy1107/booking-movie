import { Button, Collapse, message, Pagination, Space, Spin } from "antd";
import { Loading } from "components/common/loading";
import LoginSuccess from "components/login-success";
import { MovieCard } from "components/movie-card";
import Title from "components/shared/title";
import { useGetGenres } from "hooks/useGetGenres";
import { useGetLanguages } from "hooks/useGetLanguages";
import usePagination from "hooks/usePagination";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { getMovieByLanguage, getPaginateMoviesAction } from "store/features/movie.slice";
import { useAppDispatch, useAppSelector } from "store/store";
import { MovieResponse } from "types/movie.type";
import "../styles/pages/_movie-list.scss";

const { Panel } = Collapse;

interface IMovies {}

const MovieList: React.FC<IMovies> = () => {
    const dispatch = useAppDispatch();
    const { moviePagination, isLoading, error } = useAppSelector((state) => state.movieSlice);
    const { languages } = useGetLanguages();
    const { genres } = useGetGenres();
    const { resPagination, handlePageChange } = usePagination(1, 12);
    const [listLang, setListlang] = React.useState<string[]>([]);
    const [listGenres, setListGenres] = React.useState<string[]>([]);

    React.useEffect(() => {
        const data = {
            ...resPagination,
        };
        dispatch(getPaginateMoviesAction(data));
    }, [dispatch, resPagination]);

    React.useEffect(() => {
        const data = [...listLang].toString().replaceAll(",", "|");

        listLang.length !== 0 && dispatch(getMovieByLanguage({ languages: data }));
    }, [dispatch, listLang]);

    const handleChange = (page: number) => {
        handlePageChange(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handlePickLanguage = (lang: string) => {
        const index = listLang.findIndex((item: string) => item === lang);
        if (index === -1) {
            setListlang((prev: string[]) => Array.from(new Set([...prev, lang])));
        } else {
            let newListLang = [...listLang];
            newListLang = newListLang.filter((item: string) => item !== lang);

            if (newListLang.length === 0) {
                setListlang([]);
                return dispatch(getPaginateMoviesAction(resPagination));
            }
            setListlang(newListLang);
        }
    };

    const handlePickGenres = (genre: string) => {
        const index = listGenres.findIndex((item: string) => item === genre);
        if (index === -1) {
            setListGenres((prev: string[]) => Array.from(new Set([...prev, genre])));
        } else {
            let newListGenres = [...listGenres];
            newListGenres = newListGenres.filter((item: string) => item !== genre);

            if (newListGenres.length === 0) {
                setListGenres([]);
                return dispatch(getPaginateMoviesAction(resPagination));
            }
            setListGenres(newListGenres);
        }
    };

    return (
        <div className="movielist">
            <Container>
                <Title title="Filter" />
                <Row>
                    <Col xl={3} lg={12}>
                        <div className="filter filter__languages">
                            <Collapse bordered={false} defaultActiveKey={["1"]} ghost>
                                <Panel
                                    header={<span className="filter__text filter__text--title">Languages</span>}
                                    key="1"
                                >
                                    <Space size={[8, 16]} wrap>
                                        {languages?.map((language: string, index: number) => {
                                            const pickIndex = listLang.findIndex((item: string) => item === language);
                                            const picked = pickIndex !== -1 ? "picked" : "";
                                            return (
                                                <Button
                                                    key={index}
                                                    className={`filter__btn filter__btn--language filter__btn--${picked}`}
                                                    onClick={() => handlePickLanguage(language)}
                                                >
                                                    <span className="filter__text filter__text--genre">{language}</span>
                                                </Button>
                                            );
                                        })}
                                    </Space>
                                </Panel>
                            </Collapse>
                        </div>
                        <div className="filter filter__genres">
                            <Collapse bordered={false} defaultActiveKey={["1"]} ghost>
                                <Panel
                                    header={<span className="filter__text filter__text--title">Genres</span>}
                                    key="1"
                                >
                                    <Space size={[8, 16]} wrap>
                                        {genres?.map((genre: string, index: number) => (
                                            <Button
                                                key={index}
                                                className="filter__btn filter__btn--genres"
                                                onClick={() => handlePickGenres(genre)}
                                            >
                                                <span className="filter__text filter__text--genre">{genre}</span>
                                            </Button>
                                        ))}
                                    </Space>
                                </Panel>
                            </Collapse>
                        </div>
                        <div>
                            <Button className="filter__btn filter__btn--clear">Clear</Button>
                        </div>
                    </Col>
                    <Col xl={9} lg={12}>
                        {!!isLoading && <Loading />}
                        <Row>
                            {moviePagination.movies?.map((movie: MovieResponse) => (
                                <Col md={3} key={movie._id}>
                                    <MovieCard movie={movie} />
                                </Col>
                            ))}
                        </Row>
                        <Row>
                            <Pagination defaultCurrent={1} total={100} className="pagination" onChange={handleChange} />
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MovieList;
