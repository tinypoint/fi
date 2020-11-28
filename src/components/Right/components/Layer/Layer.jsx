import React, { Component, useMemo } from "react";
import { Button, Menu, Dropdown, InputNumber, Row, Col } from "antd";
import Icon, {
  CheckOutlined,
  DownOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import classnames from "classnames";
import { BLEND_MODES } from "pixi.js";
import { ReactComponent as Droplet } from "bootstrap-icons/icons/droplet.svg";
import styles from "./Layer.module.scss";
import { isNumber } from "lodash";

const list = [];
for (let index of Object.keys(BLEND_MODES)) {
  if (Number.isInteger(Number(index))) {
    list.push({
      label: BLEND_MODES[index],
      value: index,
    });
  }
}

// const list = [
//   {
//     value: "Pass Through",
//     label: "Pass Through",
//   },
//   {
//     value: "Normal",
//     label: "Normal",
//   },
//   null,
//   {
//     value: "Darken",
//     label: "Darken",
//   },
//   {
//     value: "Multiply",
//     label: "Multiply",
//   },
//   {
//     value: "Color Burn",
//     label: "Color Burn",
//   },
//   null,
//   {
//     value: "Lighten",
//     label: "Lighten",
//   },
//   {
//     value: "Screen",
//     label: "Screen",
//   },
//   {
//     value: "Color Dodge",
//     label: "Color Dodge",
//   },
//   null,
//   {
//     value: "Overlay",
//     label: "Overlay",
//   },
//   {
//     value: "Soft Light",
//     label: "Soft Light",
//   },
//   {
//     value: "Hard Light",
//     label: "Hard Light",
//   },
//   null,
//   {
//     value: "Difference",
//     label: "Difference",
//   },
//   {
//     value: "Exclusion",
//     label: "Exclusion",
//   },
//   null,
//   {
//     value: "Hue",
//     label: "Hue",
//   },
//   {
//     value: "Saturation",
//     label: "Saturation",
//   },
//   {
//     value: "Color",
//     label: "Color",
//   },
//   {
//     value: "Luminosity",
//     label: "Luminosity",
//   },
// ];

const Layer = (props) => {
  const {
    alpha = 1,
    blendMode = 0,
    visible,
    onChange = () => {},
    onChangeComplete = () => {},
  } = props;

  const ret = useMemo(() => {
    const menu = (
      <Menu
        onClick={({ key }) => {
          if (blendMode === key) {
            return;
          }
          onChange(key);
        }}
      >
        {list.map((item, index) => {
          if (item === null) {
            return <Menu.Divider key={index} />;
          } else {
            return (
              <Menu.Item
                key={item.value}
                className={styles.item}
                icon={blendMode === item.value ? <CheckOutlined /> : null}
              >
                {item.label}
              </Menu.Item>
            );
          }
        })}
      </Menu>
    );
    return (
      <div className={styles.panel}>
        <div className={styles.row}>
          <div className={styles.panelTitle}>Layer</div>
        </div>
        <div className={styles.row}>
          <Row justify="space-between">
            <Col span={13}>
              <Dropdown overlay={menu} trigger="click">
                <Button
                  icon={
                    <Icon component={Droplet} className={styles.icon}></Icon>
                  }
                  className={styles.blendMode}
                >
                  {BLEND_MODES[blendMode]}
                  <DownOutlined className={styles.icon} />
                </Button>
              </Dropdown>
            </Col>
            <Col offset={1} span={9} className={styles.right}>
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
                onClick={() => {
                  onChangeComplete({
                    visible: !visible,
                  });
                }}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }, [alpha, blendMode, visible]);

  return ret;
};

export default Layer;
