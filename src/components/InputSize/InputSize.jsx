import React, { useState, useRef } from "react";
import { InputNumber } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import styles from "./InputSize.module.scss";

const InputSize = (props) => {
  const { suffix, value, onChange, onChangeComplete } = props;

  const focusRef = useRef(false);

  const onMouseUp = (e) => {
    if (!focusRef.current) {
      focusRef.current = true;
      const { target } = e;

      const selectedValue = getSelection().toString();
      if (selectedValue.length <= 0) {
        target.select();
      }
    }
  };

  return (
    <label className={styles.label}>
      <span className={styles.suffix}>{suffix}</span>
      <InputNumber
        value={value}
        className={styles.inputsize}
        onBlur={() => {
          focusRef.current = false;
        }}
        onMouseUp={onMouseUp}
        onChange={(val) => {
          onChange(val);
        }}
      />
    </label>
  );
};

export default InputSize;
