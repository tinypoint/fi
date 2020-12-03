import React, { Component } from "react";
import {
  Button,
  Menu,
  Dropdown,
  InputNumber,
  Row,
  Col,
  Input,
  Popover,
} from "antd";
import Icon, {
  PlusOutlined,
  DownOutlined,
  SmallDashOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import classnames from "classnames";
import { BLEND_MODES } from "pixi.js";
import { ReactComponent as Droplet } from "bootstrap-icons/icons/droplet.svg";
import { SketchPicker } from "react-color";
import styles from "./Fill.module.scss";

class Layer extends Component {
  render() {
    const {
      backgrounds,
      onChange = () => {},
      onChangeComplete = () => {},
    } = this.props;
    return (
      <div className={styles.panel}>
        <div className={styles.row}>
          <Row justify="space-between">
            <Col>
              <div className={styles.panelTitle}>Fill</div>
            </Col>
            <Col>
              <Button
                type="text"
                className={styles.visible}
                icon={<SmallDashOutlined className={classnames(styles.icon)} />}
              />
              <Button
                type="text"
                className={styles.visible}
                icon={<PlusOutlined className={classnames(styles.icon)} />}
                onClick={() => {
                  const background = {
                    color: "#cccccc",
                    type: "solid",
                    visible: true,
                    alpha: 1,
                  };
                  onChangeComplete({
                    backgrounds: [background, ...backgrounds],
                  });
                }}
              />
            </Col>
          </Row>
        </div>
        <div className={styles.row}>
          {backgrounds.map((background, index) => {
            return (
              <Row key={index} justify="space-between">
                <Col span={16}>
                  <Input.Group compact className={styles.colorContainer}>
                    <Input
                      className={styles.color}
                      value={background.color}
                      onPressEnter={(e) => {
                        const str = e.target.value;
                        let value = background.color;
                        if (str.match(/^#?[0-9a-fA-F]{0,6}$/)) {
                          console.log("match");
                        } else {
                          console.log("not match");
                        }

                        const cacheBackgrounds = [...backgrounds];
                        const cacheBackground = {
                          ...background,
                          color: value,
                        };
                        cacheBackgrounds.splice(index, 1, cacheBackground);
                        onChangeComplete({
                          backgrounds: cacheBackgrounds,
                        });
                      }}
                      prefix={
                        <Popover
                          placement="rightTop"
                          title={""}
                          content={
                            <div
                              onClick={({ key }) => {}}
                              className={styles.colorPickerPop}
                            >
                              <SketchPicker
                                color={background.color}
                                onChange={({ hex }) => {
                                  const cacheBackgrounds = [...backgrounds];
                                  const cacheBackground = {
                                    ...background,
                                    color: hex,
                                  };
                                  cacheBackgrounds.splice(
                                    index,
                                    1,
                                    cacheBackground
                                  );
                                  onChange({
                                    backgrounds: cacheBackgrounds,
                                  });
                                }}
                                onChangeComplete={({ hex }) => {
                                  const cacheBackgrounds = [...backgrounds];
                                  const cacheBackground = {
                                    ...background,
                                    color: hex,
                                  };
                                  cacheBackgrounds.splice(
                                    index,
                                    1,
                                    cacheBackground
                                  );
                                  onChangeComplete({
                                    backgrounds: cacheBackgrounds,
                                  });
                                }}
                              />
                            </div>
                          }
                          trigger="click"
                        >
                          <span
                            className={styles.colorPicker}
                            style={{
                              backgroundColor: background.color,
                            }}
                          />
                        </Popover>
                      }
                    />
                    <InputNumber
                      value={background.alpha * 100}
                      min={0}
                      max={100}
                      formatter={(value) => `${value}%`}
                      parser={(value) => value.replace("%", "")}
                      onBlur={(e) => {
                        const cacheBackgrounds = [...backgrounds];
                        const cacheBackground = {
                          ...background,
                          alpha: Number(e.target.value.replace("%", "")) / 100,
                        };
                        cacheBackgrounds.splice(index, 1, cacheBackground);
                        onChangeComplete({
                          backgrounds: cacheBackgrounds,
                        });
                      }}
                      onPressEnter={(e) => {
                        const cacheBackgrounds = [...backgrounds];
                        const cacheBackground = {
                          ...background,
                          alpha: Number(e.target.value.replace("%", "")) / 100,
                        };
                        cacheBackgrounds.splice(index, 1, cacheBackground);
                        onChangeComplete({
                          backgrounds: cacheBackgrounds,
                        });
                      }}
                      className={styles.alpha}
                    />
                  </Input.Group>
                </Col>
                <Col className={styles.right}>
                  <Button
                    type="text"
                    className={styles.visible}
                    icon={
                      background.visible ? (
                        <EyeOutlined className={classnames(styles.icon)} />
                      ) : (
                        <EyeInvisibleOutlined
                          className={classnames(styles.icon)}
                        />
                      )
                    }
                    onClick={() => {
                      const cacheBackgrounds = [...backgrounds];
                      const cacheBackground = {
                        ...background,
                        visible: !background.visible,
                      };
                      cacheBackgrounds.splice(index, 1, cacheBackground);
                      onChangeComplete({
                        backgrounds: cacheBackgrounds,
                      });
                    }}
                  />
                  <Button
                    type="text"
                    className={styles.visible}
                    icon={<MinusOutlined className={classnames(styles.icon)} />}
                    onClick={() => {
                      const cacheBackgrounds = [...backgrounds];

                      cacheBackgrounds.splice(index, 1);
                      onChangeComplete({
                        backgrounds: cacheBackgrounds,
                      });
                    }}
                  />
                </Col>
              </Row>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Layer;
