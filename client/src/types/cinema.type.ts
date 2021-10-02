import { ShowtimeType } from "./shared/showtime.type";

export interface CinemaResponse {
    readonly _id: string;
    cinema_name: string;
    address: string;
    logo: string;
    showtimes: ShowtimeType[];
}
