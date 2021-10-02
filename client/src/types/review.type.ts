import { MovieResponse, PaginationRequestType } from "types/movie.type";
export interface ReviewRepsonse {
    readonly _id: string;
    create_at: Date;
    movie: MovieResponse;
    user: { username: string; email: string };
    content: string;
    rating?: number;
    like?: number;
}

export interface ReviewPayload extends PaginationRequestType {
    _id: string;
}

export interface AdditionalReviewPayload {
    content: string;
    movieId: string;
    userId: string;
    rating?: number;
}

export interface ReviewState {
    reviews: ReviewRepsonse[];
    isLoading: boolean;
    error?: Error | null;
}
