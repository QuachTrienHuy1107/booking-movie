import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import { Button, Space, Spin } from "antd";
import usePagination from "hooks/usePagination";
import React from "react";
import { useInView } from "react-intersection-observer";
import reviewApi from "service/review.service";
import { ReviewRepsonse } from "types/review.type";
import "../styles/components/_review-list.scss";
import UserInfo from "./common/info";
import Rater from "./common/rating";
import Timer from "./common/timer";

interface IReviewList {
    _id?: string;
    reviews: ReviewRepsonse[];
    handlePageChange?: () => void;
}

const ReviewList: React.FC<IReviewList> = ({ handlePageChange, reviews }) => {
    const [_reviews, _setReviews] = React.useState<ReviewRepsonse[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [page, setPage] = React.useState(1);
    // const { resPagination, handlePageChange } = usePagination(1, 2);

    // React.useEffect(() => {
    //     const _data = {
    //         ...resPagination,
    //         _id,
    //     };
    //     async function fetchNewReview() {
    //         try {
    //             setLoading(true);
    //             const { response, error } = (await reviewApi.getReviewByMovieId(_data)) as any;
    //             if (!!error) throw new Error("INTERNAL SERVER");
    //             _setReviews((_prev: ReviewRepsonse[]) => [..._prev, ...response.data]);
    //         } catch (error: any) {
    //             console.log("Error", error.message);
    //             setError(error.message);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    //     fetchNewReview();
    // }, [_id, resPagination]);

    console.log("_reviews", _reviews);

    return (
        <div className={`review-list ${loading && "pending"}`}>
            {!!loading && <Spin />}
            {reviews?.map((review: ReviewRepsonse, index: number) => {
                return (
                    <>
                        <div className="review">
                            <div className="review__wrapper">
                                <div className="review__item review__item__info">
                                    <Space>
                                        <UserInfo username={review.user.username} />
                                    </Space>
                                    <Space>
                                        <Rater number={review.rating as number} size={24} />
                                    </Space>
                                </div>
                                <div className="review__item review__item__content review__item--detail">
                                    <p>{review.content}</p>
                                </div>
                                <div className="review__item review__item__controls">
                                    <div className="review__item__controls--left">
                                        <Button icon={<LikeOutlined />} shape="circle" />

                                        <span>123 </span>
                                        <Button icon={<DislikeOutlined />} shape="circle" />
                                    </div>
                                    <Timer time="24 days ago" />
                                </div>
                            </div>
                        </div>
                    </>
                );
            })}
        </div>
    );
};
export default ReviewList;
