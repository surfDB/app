import React from "react";
import { motion } from "framer-motion";

type Props = {
  type?: "primary" | "secondary";
  children: React.ReactNode;
  onClick?: () => void;
};

export default function Button({ type = "primary", children, onClick }: Props) {
  return (
    <motion.button
      whileHover={{
        translateY: -4,
        cursor: "pointer",
      }}
      whileTap={{
        // translateY: 2,
        backgroundColor: "#00CFC899",
      }}
      style={{
        background: type === "primary" ? "#00CFC811" : "#222",
        color: type === "primary" ? "#00CFC8" : "#00CFC8",
        border: type === "primary" ? "none" : "1px solid #00CFC8",
        padding: "1.2rem 2rem",
        borderRadius: "0.75rem",
        fontSize: "0.7rem",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.15rem",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.2)",
      }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
