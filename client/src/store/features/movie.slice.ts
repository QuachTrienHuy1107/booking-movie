import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetDetailPayload } from "types/shared/get-detail.type";
import {
    BookingPayload,
    HomeState,
    MoviePaginationResponse,
    MovieWithLanguagePayload,
    PaginationRequestType,
    ShowtimeResponse,
} from "../../types/movie.type";

const initialState: HomeState = {
    movies: [],
    moviePagination: { movies: [], total: 0 },
    movieDetail: {},
    showtime: {},
    isLoading: true,
    error: null,
};

const movieSlice = createSlice({
    name: "movieslice",
    initialState,
    reducers: {
        //Get movies with pagination
        getPaginateMoviesAction: (state, action: PayloadAction<PaginationRequestType>) => {
            state.isLoading = true;
            state.error = null;
        },
        getPaginateMoviesActionSucess(state, action: PayloadAction<MoviePaginationResponse>) {
            state.moviePagination = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        getPaginateMoviesActionFailure(state, action: PayloadAction<Error>) {
            state.error = action.payload;
            state.isLoading = false;
        },

        getMovieByLanguage: (state, action: PayloadAction<MovieWithLanguagePayload>) => {
            state.isLoading = true;
        },
        getMovieByLanguageSuccess: (state, action: PayloadAction<MoviePaginationResponse>) => {
            state.moviePagination = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        getMovieByLanguageFailure: (state, action: PayloadAction<Error>) => {
            console.log("error", action.payload);
            state.isLoading = false;
            state.error = action.payload;
        },

        getMovieByGenres: (state, action: PayloadAction<MovieWithLanguagePayload>) => {
            state.isLoading = true;
        },
        getMovieByGenresSuccess: (state, action: PayloadAction<MoviePaginationResponse>) => {
            state.moviePagination = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        getMovieByGenresFailure: (state, action: PayloadAction<Error>) => {
            console.log("error", action.payload);
            state.isLoading = false;
            state.error = action.payload;
        },

        getMovieDetailAction(state, action: PayloadAction<GetDetailPayload>) {
            state.isLoading = true;
            state.error = null;
        },
        getMovieDetailActionSuccess: (state, action: PayloadAction<any>) => {
            state.movieDetail = action.payload;
            state.isLoading = false;
        },
        getMovieDetailFailure(state, action: PayloadAction<Error>) {
            state.error = action.payload;
            state.isLoading = false;
        },

        getShowtime: (state, action: PayloadAction<GetDetailPayload>) => {
            state.isLoading = true;
        },
        getShowtimeSuccess: (state, action: PayloadAction<ShowtimeResponse>) => {
            state.showtime = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        getShowtimeFailure: (state, action: PayloadAction<Error>) => {
            state.error = action.payload;
            state.isLoading = false;
        },

        booking: (state, action: PayloadAction<BookingPayload>) => {
            state.isLoading = true;
            state.error = null;
        },
        bookingSuccess: (state, action: PayloadAction<any>) => {
            console.log("aaaa", action.payload);
            state.error = null;
            state.isLoading = false;
        },
        bookingFailure: (state, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

const { actions, reducer } = movieSlice;

export const {
    getPaginateMoviesAction,
    getPaginateMoviesActionSucess,
    getPaginateMoviesActionFailure,
    getMovieDetailAction,
    getMovieDetailActionSuccess,
    getMovieDetailFailure,
    getMovieByLanguage,
    getMovieByLanguageSuccess,
    getMovieByLanguageFailure,
    getMovieByGenres,
    getMovieByGenresSuccess,
    getMovieByGenresFailure,
    getShowtime,
    getShowtimeSuccess,
    getShowtimeFailure,
    booking,
    bookingSuccess,
    bookingFailure,
} = actions;

export default reducer;
