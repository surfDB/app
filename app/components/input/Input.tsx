import React from "react";
import styled from "styled-components";

type Props = {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
};

export default function Input({ value, onChange, label, placeholder }: Props) {
  return (
    <Container>
      <label>{label}</label>
      <InputField
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        placeholder={placeholder}
      />
    </Container>
  );
}

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

const InputField = styled.input`
  background: #00cfc822;
  border: 1px solid #00cfc8;
  border-radius: 0.75rem;
  padding: 1rem 1rem;
  font-size: 1.25rem;
  font-weight: 500;
  color: #eefcfb;
  width: 100%;
  margin-bottom: 1rem;
  ::placeholder {
    color: #eefcfb44;
  }
`;
