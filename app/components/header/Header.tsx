import Image from "next/image";
import React from "react";
import styled from "styled-components";

type Props = {};

const NavContainer = styled.div``;

export default function Header({}: Props) {
  return (
    <NavContainer>
      <Image src="/logo.svg" alt="Logo" width="180" height="111" />
    </NavContainer>
  );
}
