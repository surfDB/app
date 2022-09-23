import { motion } from "framer-motion";
import React from "react";

import styled from "styled-components";
import Backdrop from "./Backdrop";

type props = {
  children: React.ReactNode;
  title: string;
  handleClose: () => void;
  height?: string;
  size?: "small" | "medium" | "large";
  zIndex?: number;
};

const getResponsiveWidth = (size: "small" | "medium" | "large") => {
  switch (size) {
    case "small":
      return { xs: "full", md: "128" };
    case "medium":
      return { xs: "full", md: "192" };
    case "large":
      return { xs: "full", md: "256" };
    default:
      return { xs: "full", md: "192" };
  }
};

function Modal({
  handleClose,
  title,
  children,
  height,
  size = "medium",
  zIndex,
}: props) {
  return (
    <Backdrop onClick={handleClose} zIndex={zIndex}>
      <Container
        onClick={(e) => e.stopPropagation()}
        variants={grow}
        initial="hidden"
        animate="visible"
        exit="exit"
        modalHeight={height}
      >
        <div className="modalTitle">{title}</div>
        {children}
      </Container>
    </Backdrop>
  );
}

export default Modal;

export type { props as ModalProps };

export const grow = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      type: "spring",
      damping: 25,
      stiffness: 400,
    },
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const Container = styled(motion.div)<{
  modalHeight?: string;
}>`
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  height: ${(props) => props.modalHeight};
  max-height: 40rem;
  border-radius: 1rem;
  background-color: #222222cc;
  box-shadow: 0px 14px 14px rgba(0, 0, 0, 0.2);
  padding: 2rem 4rem;
  width: 50%;

  .modalTitle {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
    text-align: center;
  }
`;
