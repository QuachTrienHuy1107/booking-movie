import { MovieResponse, PaginationRequestType } from "types/movie.type";
export interface ReviewRepsonse {
    readonly _id?: string;
    createdAt?: Date;
    movie?: MovieResponse;
    user?: { username: string; email: string; avatar: string };
    content?: string;
    rating?: number;
    like?: number;
}

export interface ReviewPaginationResponse {
    reviewList: ReviewRepsonse[];
    total: number;
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
    reviews: ReviewPaginationResponse;
    isLoading: boolean;
    error?: Error | null;
}
