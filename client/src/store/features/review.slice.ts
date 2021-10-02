import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdditionalReviewPayload, ReviewPayload, ReviewRepsonse, ReviewState } from "types/review.type";

const initialState: ReviewState = {
    reviews: [],
    isLoading: false,
};

const reviewSlice = createSlice({
    name: "reviewslice",
    initialState,
    reducers: {
        getReviewByMovie: (state, action: PayloadAction<ReviewPayload>) => {
            state.isLoading = true;
            state.error = null;
        },
        getReviewByMovieSuccess: (state, action: PayloadAction<ReviewRepsonse[]>) => {
            state.reviews = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        getReviewByMovieFailure: (state, action: PayloadAction<Error>) => {
            state.error = action.payload;
            state.isLoading = false;
        },

        addNewReview: (state, action: PayloadAction<AdditionalReviewPayload>) => {
            state.isLoading = true;
            state.error = null;
        },
        addNewReviewSuccess: (state, action: PayloadAction<ReviewRepsonse>) => {
            state.reviews.unshift(action.payload);
            state.error = null;
            state.isLoading = false;
        },
        addNewReviewFailure: (state, action: PayloadAction<Error>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

const { actions, reducer } = reviewSlice;

export const {
    getReviewByMovie,
    getReviewByMovieSuccess,
    getReviewByMovieFailure,
    addNewReview,
    addNewReviewSuccess,
    addNewReviewFailure,
} = actions;

export default reducer;
