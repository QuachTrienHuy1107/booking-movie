import { MovieResponse } from "types/movie.type";

export interface ShowtimeType {
    readonly _id: string;
    time: string;
    movie: MovieResponse;
    tickets: any[];
}
