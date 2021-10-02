import React from "react";
import { Form, Row, Col, Select } from "antd";
const Filter: React.FC = () => {
    return (
        <div className="filter">
            <Form>
                <Row gutter={[12, 8]} justify="space-between" align="middle">
                    <Col lg={5} md={24} sm={24}>
                        <Select></Select>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};
export default Filter;
