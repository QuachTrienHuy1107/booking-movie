/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Modal, Space, Tabs } from "antd";
import moment from "moment";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import { CinemaResponse } from "types/cinema.type";
import { ShowtimeResponse } from "types/movie.type";
import { ROUTES } from "utils/constant";
import "../styles/components/_schedule.scss";

const { TabPane } = Tabs;

const tabExtra = (
    <div className="schedule__info">
        <span className="schedule__attr">
            <span className="schedule__icon schedule__icon--available"></span>
            <span className="schedule__text schedule__text--attr">AVAILABLE</span>
        </span>
        <span className="schedule__attr">
            <span className="schedule__icon schedule__icon--filling"></span>
            <span className="schedule__text schedule__text--attr">AVAILABLE</span>
        </span>
    </div>
);

interface ISchedule {
    cinema: CinemaResponse[] | [];
}

const Schedule: React.FC<ISchedule> = ({ cinema }) => {
    console.log("cinema", cinema);
    const [open, setOpen] = React.useState(false);
    const history = useHistory();

    const handleOk = () => {
        setOpen(!open);
    };

    const handleCancle = () => {
        setOpen(!open);
    };
    return (
        <div className="schedule">
            <Tabs tabBarExtraContent={tabExtra}>
                <TabPane tab="Tab 1" key="1">
                    <ul className="schedule__detail">
                        {cinema?.map((item: CinemaResponse, index: number) => (
                            <li key={item._id}>
                                <Row>
                                    <Col md={2}>
                                        <h1 className="schedule__text schedule__text--title">{item.cinema_name}</h1>
                                        <span className="schedule__text schedule__text--address">{item.address}</span>
                                    </Col>
                                    <Col md={1} className="map">
                                        <a
                                            onClick={() => setOpen(true)}
                                            style={{ marginBottom: 0, display: "inline-block" }}
                                        >
                                            <img
                                                src="https://in.bmscdn.com/moviemode/cinemaphotoshowcase/safety_first.png"
                                                alt=""
                                                style={{
                                                    display: "inline-block",
                                                    width: 20,
                                                    transform: "translateY(5px)",
                                                }}
                                            />
                                            INFO
                                        </a>
                                        <Modal visible={open} onOk={handleOk} onCancel={handleCancle}>
                                            <iframe
                                                title="123"
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.516175095571!2d106.70230491477143!3d10.771721892324727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fae3ea605ab%3A0x2afaf7f3826e5c42!2sBHD%20Star%20Cineplex!5e0!3m2!1svi!2s!4v1623169068723!5m2!1svi!2s"
                                                width="600"
                                                height="450"
                                                className="video"
                                                allowFullScreen={true}
                                                loading="lazy"
                                            ></iframe>
                                        </Modal>
                                    </Col>
                                    <Col md={8}>
                                        <Space size={[8, 16]} wrap>
                                            {item.showtimes.map((showtime: ShowtimeResponse) => {
                                                return (
                                                    <Button
                                                        key={showtime._id}
                                                        className="schedule__detail__time"
                                                        onClick={() =>
                                                            history.push(`${ROUTES.CHECKOUT}/${showtime._id}`)
                                                        }
                                                    >
                                                        {moment(showtime.time).format("hh:MM A")}
                                                    </Button>
                                                );
                                            })}
                                        </Space>
                                    </Col>
                                </Row>
                            </li>
                        ))}
                    </ul>
                </TabPane>
            </Tabs>
        </div>
    );
};
export default Schedule;
