/* eslint-disable react/prop-types */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { LOCAL_STORAGE, ORIGINAL_DATA } from "../../utils/constants";
import { Row, Col, Card, Typography, Button } from "antd";
import { ProductListContainer } from "./ProductListPageStyle";
import { UserOutlined } from "@ant-design/icons";

const { Meta } = Card;
const { Title } = Typography;

export default class ProductListPage extends Component {
  state = {
    products: [],
  };

  loadData = async () => {
    const data = await ORIGINAL_DATA;
    this.setState({
      products: data,
    });
  };

  goRecentListPage = () => {
    this.props.history.push("/recent-list");
  };

  handleRecentList = async (product) => {
    const recentItem = {
      id: product.id,
      dislike: false,
    };
    const newRecentList = removeDuplicatedItemById(
      await LOCAL_STORAGE.get("recentList"),
      product.id
    );

    LOCAL_STORAGE.set("recentList", [recentItem, ...newRecentList]);
  };

  componentDidMount() {
    this.loadData();
  }

  render() {
    const { products } = this.state;

    return (
      <div>
        <ProductListContainer>
          <Row gutter={[16, 16]} type="flex">
            <Col span={16}>
              <Title>상품 목록</Title>
            </Col>

            <Col span={8} style={{ textAlign: "right" }}>
              <Button
                type="primary"
                icon={<UserOutlined />}
                onClick={this.goRecentListPage}
              >
                {" "}
                최근 본 상품 목록
              </Button>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            {products.map((product) => {
              return (
                <Col lg={6} md={8} xs={24} key={product.id}>
                  <Link
                    to={`/product/${product.id}`}
                    onClick={() => this.handleRecentList(product)}
                  >
                    <Card
                      hoverable={true}
                      cover={<img alt="example" src={product.imgUrl} />}
                    >
                      <Meta
                        title={product.title}
                        description={`${product.price}원`}
                      />
                    </Card>
                  </Link>
                </Col>
              );
            })}
          </Row>
        </ProductListContainer>
      </div>
    );
  }
}

const removeDuplicatedItemById = (arr, id) => {
  return arr.filter((item) => item.id !== id);
};
