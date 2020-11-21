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
  PlusSquareOutlined,
  DownOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import classnames from "classnames";
import { BLEND_MODES } from "pixi.js";
import { ReactComponent as Droplet } from "bootstrap-icons/icons/droplet.svg";
import styles from "./Fill.module.scss";

class Layer extends Component {
  render() {
    const {
      alpha = 1,
      color = "FFFFFF",
      visible,
      onChange = () => {},
    } = this.props;

    const content = (
      <div onClick={({ key }) => {}} className={styles.colorPickerPop}></div>
    );
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
                icon={
                  <PlusSquareOutlined className={classnames(styles.icon)} />
                }
              />
            </Col>
          </Row>
        </div>
        <div className={styles.row}>
          <Row justify="space-between">
            <Col span={16}>
              <Input.Group compact className={styles.colorContainer}>
                <Input
                  className={styles.color}
                  value={color}
                  prefix={
                    <Popover
                      placement="rightTop"
                      title={""}
                      content={content}
                      trigger="click"
                    >
                      <span
                        className={styles.colorPicker}
                        style={{
                          backgroundColor: "#ccc",
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
                  onChange={onChange}
                  className={styles.alpha}
                />
              </Input.Group>
            </Col>
            <Col className={styles.right}>
              <Button
                type="text"
                className={styles.visible}
                icon={
                  visible ? (
                    <EyeOutlined className={classnames(styles.icon)} />
                  ) : (
                    <EyeInvisibleOutlined className={classnames(styles.icon)} />
                  )
                }
              />
              <Button
                type="text"
                className={styles.visible}
                icon={
                  visible ? (
                    <EyeOutlined className={classnames(styles.icon)} />
                  ) : (
                    <EyeInvisibleOutlined className={classnames(styles.icon)} />
                  )
                }
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Layer;
