import React from "react";
import styled from "styled-components/macro";

export type InputTextProps = {
  onChange: (text: string) => void;
  value?: string | undefined | number | null;
  placeholder?: string;
  isError?: boolean;
};

const InputTextComponent = (props: InputTextProps) => {
  const { value, placeholder, isError, onChange } = props;
  return (
    <InputText hasError={isError!}>
      <input
        onChange={(v) => onChange(v.target.value)}
        value={value!}
        className="input-text"
        placeholder={placeholder}
      />
    </InputText>
  );
};

const InputText = styled.div<{ hasError: boolean }>`
  display: flex;
  width: 100%;
  height: 20px;
  border-radius: 5px;
  padding: 5px;
  background-color: #2c2f33;
  align-items: center;
  border: 1px solid transparent;
  border-color: ${({ hasError }) => (hasError ? "#91110d" : "transparent")};

  > .input-text {
    background: transparent;
    border: none;
    margin-left: 10px;
    width: 100%;
    color: #fff;
  }

  .input-text:focus {
    outline: none;
    caret-color: #fff;
    color: #fff;
  }
`;

export default InputTextComponent;
