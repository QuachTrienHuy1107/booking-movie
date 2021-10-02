import { Button, Modal, Slider, Form, Input } from "antd";
import HeartIcon from "components/common/heart";
import ReviewList from "components/review-list";
import usePagination from "hooks/usePagination";
import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router";
import { addNewReview, getReviewByMovie } from "store/features/review.slice";
import { useAppDispatch, useAppSelector } from "store/store";
import { AdditionalReviewPayload, ReviewPayload } from "types/review.type";
import { formItemLayout } from "utils/helper";
import "../styles/pages/_review-page.scss";

const ReviewPage: React.FC = () => {
    const { _id } = useParams<any>();
    const dispatch = useAppDispatch();
    const { credential } = useAppSelector((state) => state.authSlice);
    const { resPagination, handlePageChange } = usePagination(1, 4);
    const { reviews } = useAppSelector((state) => state.reviewSlice);
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    React.useEffect(() => {
        const data = {
            ...resPagination,
            _id,
        };
        dispatch(getReviewByMovie(data));
    }, [dispatch, _id, resPagination]);

    const reviewsMemo = React.useMemo(() => reviews, [reviews]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = (values: any) => {
        if (!credential) return;
        const data: AdditionalReviewPayload = {
            ...values,
            movieId: _id,
            userId: credential.user?._id,
        };
        dispatch(addNewReview(data));
        setIsModalVisible(false);
    };

    return (
        <div className="reviews">
            <Container>
                <div className="reviews__title">
                    <h1>
                        <HeartIcon size={40} />
                        <span> 91% </span> Rating
                    </h1>
                    <p>Ten phim</p>
                </div>
                <div className="reviews__rating">
                    <div className="reviews__rating--content">
                        <h1 className="reviews__maintext">Add your rating {"&"} reviews</h1>
                        <p className="reviews__subtext">Your rating master</p>
                    </div>
                    <Button className="reviews__rating__btn reviews__rating__btn--rating" onClick={showModal}>
                        Rate now
                    </Button>
                </div>
                <h1 className="reviews__maintext reviews__maintext--title">Most helpful reviews</h1>
                <ReviewList reviews={reviewsMemo} handlePageChange={handlePageChange} />

                <Modal
                    title="How was the movie?"
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                    destroyOnClose={true}
                >
                    <Form onFinish={onFinish} name="review">
                        <Form.Item
                            {...formItemLayout}
                            name="rating"
                            label="How would you rate the movie"
                            rules={[{ required: true, message: "Please rating!" }]}
                        >
                            <Slider defaultValue={0} />
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            name="content"
                            label="Express more, write a review"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your review!",
                                },
                            ]}
                        >
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item style={{ marginBottom: 0 }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="reviews__rating__btn reviews__rating__btn--submit"
                            >
                                SUBMIT
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </Container>
        </div>
    );
};
export default ReviewPage;
