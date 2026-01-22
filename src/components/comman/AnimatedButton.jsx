import { Button } from "@mui/material";
import { useState } from "react";

/**
 * AnimatedButton Component
 * A button with left-right movement and repeating border highlight
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.startIcon - Icon to display at the start
 * @param {Function} props.onClick - Click handler
 * @param {string} props.children - Button text
 * @param {string} props.variant - Button variant (default: "outlined")
 * @param {string} props.size - Button size (default: "small")
 * @param {Object} props.sx - Additional sx styles
 */
export const AnimatedButton = ({
  startIcon,
  onClick,
  children,
  variant = "outlined",
  size = "small",
  sx = {},
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button
      variant={variant}
      size={size}
      startIcon={startIcon}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        textTransform: "none",
        borderRadius: 5,
        border: "2px solid var(--themeColor)",
        color: "var(--themeColor)",
        fontWeight: 600,
        fontSize: { md: 13, lg: 14 },
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        overflow: "visible",
        backgroundColor: "#fff",
        zIndex: 1,
        // Left-right movement
        animation: !isHovered ? "leftRightMove 2s ease-in-out infinite, borderHighlight 1.5s ease-in-out infinite" : "none",
        "@keyframes leftRightMove": {
          "0%, 100%": {
            transform: "translateX(0)",
          },
          "50%": {
            transform: "translateX(5px)",
          },
        },
        "@keyframes borderHighlight": {
          "0%, 100%": {
            borderColor: "var(--themeColor)",
            boxShadow: "0 0 0 0 rgba(255, 148, 114, 0)",
          },
          "25%": {
            borderColor: "#FF9472",
            boxShadow: "0 0 0 2px rgba(255, 148, 114, 0.3)",
          },
          "50%": {
            borderColor: "#F2709C",
            boxShadow: "0 0 0 4px rgba(242, 112, 156, 0.2)",
          },
          "75%": {
            borderColor: "#FF9472",
            boxShadow: "0 0 0 2px rgba(255, 148, 114, 0.3)",
          },
        },
        "&:hover": {
          borderColor: "#FF9472",
          backgroundColor: "#fbeeee",
          transform: "translateX(0) translateY(-2px)",
          boxShadow: "0 4px 12px rgba(95,41,48,0.15)",
          animation: "none",
        },
        ...sx,
      }}
    >
      {children}
    </Button>
  );
};
