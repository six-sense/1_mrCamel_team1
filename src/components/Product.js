import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, Col, message, Row } from "antd";
import { getOriginalInfo } from "../utils/getOriginalInfo";
import Meta from "antd/lib/card/Meta";
import { Link } from "react-router-dom";

export default class Product extends Component {
  constructor() {
    super();
    this.handleAccessPopup = this.handleAccessPopup.bind(this);
  }

  handleAccessPopup(dislike) {
    if (dislike) {
      message.warning("관심없는 상품으로 등록하신 상품입니다.", 1);
    }
  }

  render() {
    const { productList } = this.props;

    return (
      <Row gutter={[16, 16]}>
        {productList.map((data) => {
          const originalData = getOriginalInfo(data.id);

          return (
            <Col lg={6} md={8} xs={24} key={data.id}>
              <Link
                to={(location) => {
                  if (data.dislike) {
                    return { ...location };
                  }
                  return {
                    ...location,
                    pathname: `/product/${data.id}`,
                  };
                }}
                onClick={() => this.handleAccessPopup(data.dislike)}
              >
                <Card
                  hoverable={true}
                  cover={<img alt="example" src={originalData.imgUrl} />}
                >
                  <Meta
                    title={originalData.title}
                    description={`${originalData.price.toLocaleString(
                      "ko-KR"
                    )}원`}
                  />
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    );
  }
}

Product.propTypes = {
  productList: PropTypes.array,
};
