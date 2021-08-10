/* eslint-disable react/prop-types */

import React, { Component } from "react";
import PropTypes from "prop-types";
import BrandFilterMenu from "../../components/BrandFilterMenu";
import DislikeFilter from "../../components/DislikeFilter";
import { RecentListContainer } from "./RecentListPageStyle";
import { LOCAL_STORAGE } from "../../utils/constants";
import { Row, Col, Card, message, Checkbox, Typography, Button } from "antd";
import { Link } from "react-router-dom";
import { getOriginalInfo } from "../../utils/getOriginalInfo";
import { RollbackOutlined } from "@ant-design/icons";

const { Meta } = Card;
const { Title } = Typography;

export default class RecentListPage extends Component {
  state = {
    datas: [],
    checked: [],
    onlyInterestingProduct: false,
    filteredDatas: [],
    priceChecked: false,
    date: new Date(),
  };

  update = () => {
    this.setState({
      date: new Date(),
    });
  };

  getRecentList = () => {
    this.setState({
      datas: LOCAL_STORAGE.get("recentList"),
    });
  };

  clearRecentList = () => {
    this.setState({
      datas: LOCAL_STORAGE.clear("recentList"),
    });
  };

  handleBrandFilters = (checked) => {
    this.setState({
      checked: checked,
    });
  };

  handleDislikeFilter = (checked) => {
    this.setState({
      onlyInterestingProduct: checked,
    });
  };

  handleAccessPopup = (dislike) => {
    if (dislike) {
      message.warning("관심없는 상품으로 등록하신 상품입니다.", 1);
    }
  };

  handlePriceSort = (e) => {
    this.setState({
      priceChecked: e.target.checked,
    });
  };

  // goProductListPage = () => {
  //   this.props.history.push("/product");
  // };

  componentDidMount() {
    this.getRecentList();

    setInterval(this.update, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    const hour = this.state.date.getHours();
    const minute = this.state.date.getMinutes();
    const second = this.state.date.getSeconds();

    if (hour + minute + second === 0) {
      if (prevState.date !== this.state.date) {
        this.clearRecentList();
      }
    }
  }

  render() {
    const { datas, checked, onlyInterestingProduct, priceChecked } = this.state;

    let products = datas;
    products = products.map((data) => {
      const originalData = getOriginalInfo(data.id);
      return { ...data, price: originalData.price };
    });
    console.log(products);
    let filteredList;

    const compareFunction = (a, b) => {
      return a.price - b.price;
    };

    if (onlyInterestingProduct) {
      products = products.filter((data) => data.dislike === false);
    }

    if (checked.length === 0) {
      filteredList = products;
      if (priceChecked) {
        products = products.map((data) => {
          const originalData = getOriginalInfo(data.id);
          return { ...data, price: originalData.price };
        });

        filteredList = products.sort(compareFunction);
      }
    } else {
      filteredList = products.filter((data) => {
        const originalData = getOriginalInfo(data.id);
        return checked.includes(originalData.brand);
      });

      if (priceChecked) {
        products = products.map((data) => {
          const originalData = getOriginalInfo(data.id);
          return { ...data, price: originalData.price };
        });

        filteredList = filteredList.sort(compareFunction);
      }
    }

    return (
      <div>
        <RecentListContainer>
          <Row type="flex">
            <Col span={16}>
              <Title>상품 조회 목록 페이지</Title>
            </Col>
            <Col span={8} style={buttonPositionStyle}>
              <Button
                type="primary"
                icon={<RollbackOutlined />}
                onClick={this.goProductListPage}
              >
                {" "}
                상품 리스트 보기
              </Button>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col lg={16} md={16} xs={24}>
              <BrandFilterMenu handleBrandFilters={this.handleBrandFilters} />
            </Col>

            <Col lg={8} md={8} xs={24}>
              <DislikeFilter handleDislikeFilter={this.handleDislikeFilter} />
              <Card size="small">
                <Checkbox onChange={this.handlePriceSort}>
                  낮은 가격 순
                </Checkbox>
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            {filteredList &&
              filteredList.map((data) => {
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
                          description={originalData.brand}
                        />
                      </Card>
                    </Link>
                  </Col>
                );
              })}
          </Row>
        </RecentListContainer>
      </div>
    );
  }
}

const buttonPositionStyle = {
  textAlign: "right",
};

RecentListPage.propTypes = {
  recentList: PropTypes.array,
};
