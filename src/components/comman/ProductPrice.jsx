import { CustomText } from "./CustomText";

export const ProductPrice = ({ children, ...props }) => {
  return (
    <CustomText
      {...props}
      sx={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 600,
        color: "#000",
        fontSize: { xs: 11, sm: 12, md: 13 },
        textAlign: "right",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
        },
        ...props.sx,
      }}
    >
      {children}
    </CustomText>
  );
};

