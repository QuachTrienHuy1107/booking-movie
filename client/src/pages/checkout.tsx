import { PageHeader, Space, Button, Divider, Collapse } from "antd";
import Countdown from "antd/lib/statistic/Countdown";
import { useHandlePickSeat } from "hooks/useHandlePickSeat";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { booking, getShowtime } from "store/features/movie.slice";
import { useAppDispatch, useAppSelector } from "store/store";
import { BookingPayload, TicketType } from "types/movie.type";
import { GetDetailPayload } from "types/shared/get-detail.type";
import "../styles/pages/_checkout.scss";
import screenThumb from "../assets/images/screen-thumb.png";

const { Panel } = Collapse;

const deadline = Date.now() + 20000 * 60; // Moment is also OK
const Checkout: React.FC = () => {
    const dispatch = useAppDispatch();
    const { showtime, isLoading, error } = useAppSelector((state) => state.movieSlice);
    const { _id } = useParams() as GetDetailPayload;
    const { handlePickSeat, arraySeatSelected } = useHandlePickSeat();
    const { credential } = useAppSelector((state) => state.authSlice);

    React.useEffect(() => {
        dispatch(getShowtime({ _id }));
    }, [_id, dispatch]);

    console.log("arraySeatSelected", arraySeatSelected);

    const handleBooking = () => {
        const data: BookingPayload = {
            showtimeId: _id,
            arrayTickets: arraySeatSelected,
        };
        dispatch(booking(data));
    };

    const subTotal = arraySeatSelected.reduce((total: number, seat: TicketType, index: number) => {
        return (total += seat.price);
    }, 0);

    return (
        <div className="checkout">
            <PageHeader
                className="page-header"
                onBack={() => null}
                title={showtime.movie?.title}
                extra={<Countdown value={deadline} />}
            />
            <Container>
                <Row>
                    <Col lg={8} md={6}>
                        <Container>
                            <img src={screenThumb} alt="" width="100%" />
                            <div className="checkout__leftPanel">
                                <div>
                                    {showtime.tickets?.map((seat: TicketType, index: number) => {
                                        const seatSelected = arraySeatSelected?.findIndex(
                                            (item) => item._id === seat._id
                                        );
                                        const selected = seatSelected !== -1 ? true : false;
                                        return (
                                            <>
                                                <Button
                                                    onClick={() => {
                                                        handlePickSeat({
                                                            _id: seat._id,
                                                            price: seat.price,
                                                            seat_number: seat.seat_number,
                                                        });
                                                    }}
                                                    key={seat._id}
                                                    disabled={!!seat.status}
                                                    className={`seat ${
                                                        (seat.type === "Vip" && !seat.status && "seat--vip") ||
                                                        (!!seat.status && "seat--sold") ||
                                                        (!!selected && "seat--selected")
                                                    }`}
                                                >
                                                    {seat.seat_number}
                                                </Button>
                                                {(index + 1) % 16 === 0 ? <br /> : ""}
                                            </>
                                        );
                                    })}
                                </div>
                            </div>
                        </Container>
                    </Col>
                    <Col lg={4} md={6}>
                        <div className="payment">
                            <h1 className="payment__title">BOOKING SUMMARY</h1>
                            {/* <Divider /> */}

                            <div className="payment__info">
                                <h1>{showtime.movie?.title}</h1>
                                <p>{showtime.cinema?.cinema_name} </p>
                                <p>{showtime.cinema?.address}</p>
                            </div>
                            <Divider />

                            <div className="payment__item payment__item--userinfo">
                                <span>
                                    <p>Email</p>
                                    <p className="payment__text payment__text--email">{credential.user?.email}</p>
                                </span>
                            </div>
                            <Divider />

                            <div className="payment__item payment__item--seats">
                                <Space>
                                    <span style={{ width: 50 }}>Seats</span>
                                    {arraySeatSelected.map((item: TicketType) => {
                                        return <span>{item.seat_number}</span>;
                                    })}
                                </Space>
                                <span className="payment__item__price">{subTotal.toLocaleString()}</span>
                            </div>
                            <Divider />

                            <div className="payment__item payment__item--subtotal">
                                <span>Subtotal</span>
                                <span className="payment__item__price">123123</span>
                            </div>

                            <div className="payment__item--food">
                                <Collapse bordered={false} defaultActiveKey={["1"]} ghost>
                                    <Panel
                                        showArrow={false}
                                        header={
                                            <div className="payment__item payment__item--food">
                                                <span>Food and Beverage</span>
                                                <span>rpieres</span>
                                            </div>
                                        }
                                        key="1"
                                    >
                                        123
                                    </Panel>
                                </Collapse>
                            </div>

                            <span className="circle-left"></span>
                            <span className="circle-right"></span>
                        </div>
                        <Button className="checkout__btn" onClick={() => handleBooking()}>
                            <div>
                                Total: <span>{subTotal}</span>
                            </div>
                            <div>
                                <span>Process</span>
                            </div>
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Checkout;
