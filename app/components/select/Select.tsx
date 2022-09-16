import React from "react";
import styled from "styled-components";
import ReactSelect from "react-select";

export type Option = {
  value: string;
  label: string;
};

type Props = {
  label: string;
  value: Option | undefined;
  onChange: (value: Option) => void;
  options: Option[];
  placeholder?: string;
};

export default function Select({
  label,
  value,
  onChange,
  options,
  placeholder,
}: Props) {
  return (
    <Container>
      <label>{label}</label>
      <ReactSelect
        options={options}
        value={value}
        onChange={(val) => {
          onChange(val as Option);
        }}
        placeholder={placeholder}
        styles={CustomStyles}
      />
    </Container>
  );
}

const CustomStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    background: "#00cfc822",
    border: "1px solid #00cfc8",
    borderRadius: "0.75rem",
    padding: "0.5rem 0.5rem",
    fontSize: "1.25rem",
    fontWeight: "400",
    color: "#eefcfb",
    width: "100%",
    marginBottom: "1rem",
    ":hover": {
      borderColor: "#00cfc8",
    },
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    background: state.isSelected ? "#00cfc8" : "#222",
    color: state.isSelected ? "#eefcfb" : "#eefcfb",
    borderRadius: "0.75rem",
    fontWeight: "500",
    ":hover": {
      background: "#00cfc8",
      color: "#eefcfb",
    },
  }),
  menu: (provided: any, state: any) => ({
    ...provided,
    background: "#222",
    color: "#eefcfb",
    borderRadius: "0.75rem",
    border: "1px solid #00cfc8",
    marginTop: "0.1rem",
    fontSize: "0.8rem",
  }),
  menuList: (provided: any, state: any) => ({
    ...provided,
    padding: "0",
    maxHeight: "200px",
  }),
  singleValue: (provided: any, state: any) => ({
    ...provided,
    color: "#eefcfb",
  }),
  placeholder: (provided: any, state: any) => ({
    ...provided,
    color: "#eefcfb44",
  }),
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  label {
    font-size: 1rem;
    font-weight: 500;
    color: #00cfc8;
    margin-bottom: 0.5rem;
  }
`;

const SelectField = styled.select`
  background: #00cfc822;
  border: 1px solid #00cfc8;
  border-radius: 0.75rem;
  padding: 1rem 1rem;
  font-size: 1.25rem;
  font-weight: 500;
  color: #eefcfb;
  width: 100%;

  option {
    background: #00cfc822;
    border: 1px solid #00cfc8;
    border-radius: 0.75rem;
    padding: 1rem 1rem;
    font-size: 1.25rem;
    font-weight: 500;
    color: #eefcfb;
    width: 100%;
  }
`;
