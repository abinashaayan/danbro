import { CustomText } from "./CustomText";

export const ProductDescription = ({ children, ...props }) => {
  return (
    <CustomText
      variant="body2"
      {...props}
      sx={{
        color: "#666",
        mb: 1,
        fontSize: { xs: 11, sm: 12, md: 13 },
        lineHeight: 1.4,
        ...props.sx,
      }}
    >
      {children}
    </CustomText>
  );
};

