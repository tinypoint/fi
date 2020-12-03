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
  Select,
} from "antd";
import Icon, {
  PlusOutlined,
  DownOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  MinusOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import classnames from "classnames";
import { BLEND_MODES } from "pixi.js";
import { ReactComponent as Droplet } from "bootstrap-icons/icons/droplet.svg";
import { SketchPicker } from "react-color";
import styles from "./Stroke.module.scss";

const { Option } = Select;

class Stroke extends Component {
  shouldComponentUpdate(nextProps) {
    if (
      this.props.strokeAlignment === nextProps.strokeAlignment &&
      this.props.strokeWidth === nextProps.strokeWidth &&
      this.props.strokes === nextProps.strokes
    ) {
      return false;
    }
    return true;
  }

  render() {
    const {
      strokeAlignment,
      strokeWidth,
      strokes = [],
      alpha = 1,
      onChange = () => {},
      onChangeComplete = () => {},
    } = this.props;

    return (
      <div className={styles.panel}>
        <div className={styles.row}>
          <Row justify="space-between">
            <Col>
              <div className={styles.panelTitle}>Stroke</div>
            </Col>
            <Col>
              <Button
                type="text"
                className={styles.visible}
                icon={<PlusOutlined className={classnames(styles.icon)} />}
                onClick={() => {
                  console.log("add");
                  const stroke = {
                    color: "#000000",
                    width: 1,
                    style: "solid",
                    visible: true,
                  };
                  onChangeComplete({
                    strokes: [stroke, ...strokes],
                  });
                }}
              />
            </Col>
          </Row>
        </div>
        <div className={styles.row}>
          {strokes.map((stroke, index) => {
            return (
              <Row key={index} justify="space-between">
                <Col span={16}>
                  <Input.Group compact className={styles.colorContainer}>
                    <Input
                      className={styles.color}
                      value={stroke.color}
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
                                color={stroke.color}
                                onChange={({ hex }) => {
                                  const cacheStrokes = [...strokes];
                                  const cacheStroke = {
                                    ...stroke,
                                    color: hex,
                                  };
                                  cacheStrokes.splice(index, 1, cacheStroke);
                                  onChange({
                                    strokes: cacheStrokes,
                                  });
                                }}
                                onChangeComplete={({ hex }) => {
                                  const cacheStrokes = [...strokes];
                                  const cacheStroke = {
                                    ...stroke,
                                    color: hex,
                                  };
                                  cacheStrokes.splice(index, 1, cacheStroke);
                                  onChangeComplete({
                                    strokes: cacheStrokes,
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
                              backgroundColor: stroke.color,
                            }}
                          />
                        </Popover>
                      }
                    />
                    <InputNumber
                      value={alpha * 100}
                      min={0}
                      max={100}
                      formatter={(value) => `${value}%`}
                      parser={(value) => value.replace("%", "")}
                      onBlur={(e) => {
                        onChangeComplete({
                          alpha: Number(e.target.value.replace("%", "")) / 100,
                        });
                      }}
                      onPressEnter={(e) => {
                        onChangeComplete({
                          alpha: Number(e.target.value.replace("%", "")) / 100,
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
                      stroke.visible ? (
                        <EyeOutlined className={classnames(styles.icon)} />
                      ) : (
                        <EyeInvisibleOutlined
                          className={classnames(styles.icon)}
                        />
                      )
                    }
                    onClick={() => {
                      const cacheStrokes = [...strokes];
                      const cacheStroke = {
                        ...stroke,
                        visible: !stroke.visible,
                      };
                      cacheStrokes.splice(index, 1, cacheStroke);
                      onChangeComplete({
                        strokes: cacheStrokes,
                      });
                    }}
                  />
                  <Button
                    type="text"
                    className={styles.visible}
                    icon={<MinusOutlined className={classnames(styles.icon)} />}
                    onClick={() => {
                      const cacheStrokes = [...strokes];

                      cacheStrokes.splice(index, 1);
                      onChangeComplete({
                        strokes: cacheStrokes,
                      });
                    }}
                  />
                </Col>
              </Row>
            );
          })}
          <Row justify="space-between">
            <Col span={14}>
              <Input
                className={styles.color}
                value={strokeWidth}
                onChange={(value) => {
                  // onChangeComplete({
                  //   strokeWidth: value,
                  // });
                }}
                prefix={<MenuOutlined />}
              />
            </Col>
            <Col className={styles.right} span={10}>
              <Select
                value={strokeAlignment}
                onChange={(value) => {
                  onChangeComplete({
                    strokeAlignment: value,
                  });
                }}
              >
                <Option value={0.5}>Center</Option>
                <Option value={0}>Inside</Option>
                <Option value={1}>Outside</Option>
              </Select>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Stroke;
