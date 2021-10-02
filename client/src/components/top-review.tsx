import { DislikeOutlined, HeartOutlined, LikeOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import usePagination from "hooks/usePagination";
import React, { memo } from "react";
import { useLocation } from "react-router";
import Slider from "react-slick";
import { getReviewByMovie } from "store/features/review.slice";
import { useAppDispatch, useAppSelector } from "store/store";
import { ROUTES } from "utils/constant";
import "../styles/components/_top-review.scss";
import UserInfo from "./common/info";
import Rater from "./common/rating";
import Timer from "./common/timer";
import TitleNavigation from "./common/title-navigation";
import queryString from "query-string";
import { ReviewRepsonse } from "types/review.type";
import moment from "moment";

const settings = {
    className: "slider variable-width",
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    // variableWidth: true,
};

interface ITopReview {
    _id?: string;
}

const TopReview: React.FC<ITopReview> = memo(({ _id }) => {
    const dispatch = useAppDispatch();

    const { resPagination } = usePagination(1, 5);
    const { reviews } = useAppSelector((state) => state.reviewSlice);

    React.useEffect(() => {
        const data = {
            ...resPagination,
            _id,
        };
        dispatch(getReviewByMovie(data));
    }, [dispatch, _id, resPagination]);

    return (
        <section className="top-review">
            <div className="top-review__title">
                <TitleNavigation title="Top reviews" subTitle="2k8 review" linkTo={`${ROUTES.REVIEW_PAGE}/${_id}`} />
                <span className="top-review__title--subtitle">Summary of 2.8K reviews.</span>
            </div>
            <div className="top-review__reviews">
                <Slider {...settings}>
                    {reviews?.map((review: ReviewRepsonse) => {
                        return (
                            <div className="top-review__reviews__item" key="1">
                                <div>
                                    <div className="top-review__reviews__item__info">
                                        <div>
                                            <UserInfo username={review.user.username} />
                                        </div>
                                        <Space>
                                            <Rater number={review.rating as number} size={24} />
                                        </Space>
                                    </div>
                                    <div className="top-review__reviews__item__content">{review.content}</div>
                                </div>
                                <div className="top-review__reviews__item__control">
                                    <div className="top-review__reviews__item__control--left">
                                        <Button icon={<LikeOutlined />} shape="circle" />

                                        <span>123 </span>
                                        <Button icon={<DislikeOutlined />} shape="circle" />
                                    </div>
                                    <div className="top-review__reviews__item__control--right">
                                        <Timer time={moment(review.create_at).format("DD-MM")} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </Slider>
            </div>
            <div className="fence"></div>
        </section>
    );
});

export default TopReview;
