import React from "react";
import { MovieResponse, ShowtimeResponse, TicketType } from "types/movie.type";
import { Table } from "antd";
import { CinemaResponse } from "types/cinema.type";
import moment from "moment";

interface IBookingHistory {
    bookingHistory: ShowtimeResponse[] | undefined;
}

const dataSource = [
    {
        key: "1",
        name: "Mike",
        age: 32,
        address: "10 Downing Street",
    },
    {
        key: "2",
        name: "John",
        age: 42,
        address: "10 Downing Street",
    },
];

const BookingHistory: React.FC<IBookingHistory> = ({ bookingHistory }) => {
    console.log("bookingHistory", bookingHistory);

    const columns = [
        {
            title: "Id",
            key: "index",
            render: (_: any, __: any, index: any) => index + 1,
        },
        {
            title: "Cinema",
            dataIndex: "cinema",
            key: "cinema",
            width: "15%",
            render: (_cinema: CinemaResponse) => _cinema.cinema_name,
        },
        {
            title: "Movie",
            dataIndex: "movie",
            key: "movie",
            width: "20%",
            render: (_movie: MovieResponse) => _movie.title,
        },
        {
            title: "Time",
            dataIndex: "time",
            key: "time",
            width: "15%",
            render: (time: string) => moment(time).format("DD-MM-YYYY"),
        },
        {
            title: "Tickets",
            dataIndex: "tickets",
            key: "address",
            width: "40%",
            render: (tickets: TicketType[]) =>
                tickets
                    .filter((item: TicketType) => !!item.status)
                    .map((ticket: TicketType) => ticket.seat_number)
                    .join(" , "),
        },
    ];
    return (
        <div className="BookingHistory">
            <Table dataSource={bookingHistory} columns={columns} pagination={false} />
        </div>
    );
};
export default BookingHistory;
