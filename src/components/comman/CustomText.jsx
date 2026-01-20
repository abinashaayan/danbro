import { Typography } from "@mui/material";

// Helper function to convert text to proper case (not uppercase)
const toTitleCase = (str) => {
  if (!str) return str;
  // If text is all uppercase, convert to title case
  if (str === str.toUpperCase()) {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  return str;
};

export const CustomText = ({ children, autoTitleCase = false, ...props }) => {
  const displayText = autoTitleCase && typeof children === 'string' 
    ? toTitleCase(children) 
    : children;
  
  return (
    <Typography
      component="div"
      {...props}
      sx={{
        textTransform: "none",
        ...props.sx,
      }}
      style={{ textTransform: 'none', ...props.style }}
    >
      {displayText}
    </Typography>
  );
};

