import { motion } from "framer-motion";
import React from "react";

type props = {
  children: React.ReactNode;
  onClick?: () => void;
  zIndex?: number;
};

function Backdrop({ children, onClick, zIndex }: props) {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "linear-gradient(180deg, #00CFC810, #eefcfb00)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: zIndex || 1,
        backdropFilter: "blur(8px)",
      }}
    >
      {children}
    </motion.div>
  );
}

export default Backdrop;
