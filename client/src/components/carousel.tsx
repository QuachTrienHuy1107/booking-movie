import Slider from "react-slick";
import React from "react";
import banner2 from "../assets/images/carousel/banner2.png";
import banner1 from "../assets/images/carousel/banner1.jpg";
import banner3 from "../assets/images/carousel/banner3.png";
import "../styles/components/_carousel.scss";

const settings = {
    className: "center",
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};

const carouselData = [
    {
        maPhim: 1,
        hinhAnh: banner1,
        tenPhim: "banner 1",
    },
    {
        maPhim: 2,
        hinhAnh: banner2,
        tenPhim: "banner 2",
    },
    {
        maPhim: 3,
        hinhAnh: banner3,
        tenPhim: "banner 3",
    },
];

const Carousel: React.FC = () => {
    return (
        <div className="carousel">
            <Slider {...settings}>
                {carouselData.map((item) => {
                    return (
                        <div key={item.maPhim}>
                            <img src={item.hinhAnh} alt={item.tenPhim} width="100%" height="700" />
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
};
export default Carousel;
