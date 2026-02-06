import { Tabs, Tab, Box } from "@mui/material";

export const CategoryTabs = ({ categories = [], selectedCategory, onChange }) => {
  return (
    <Box
      sx={{
        mb: { xs: 3, md: 5 },
        borderColor: "divider",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflowX: "auto",
        px: { xs: 1, md: 0 },
        "&::-webkit-scrollbar": {
          height: 6,
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#f5f5f5",
          borderRadius: 3,
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#FF643A",
          borderRadius: 3,
        },
      }}
    >
      <Tabs
        value={selectedCategory}
        onChange={onChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          "& .MuiTab-root": {
            textTransform: "none",
            fontSize: { xs: 12, sm: 13, md: 14 },
            fontWeight: 600,
            color: "#666",
            minHeight: { xs: 36, sm: 40 },
            borderRadius: "6px",
            px: { xs: 2, sm: 2.5 },
            mx: { xs: 0.5, sm: 0.8 },
            border: "1px solid #ddd",
            backgroundColor: "#F5F0F2",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              background: "linear-gradient(90deg, transparent, rgba(255,100,58,0.2), transparent)",
              transition: "left 0.5s ease",
            },
            "&:hover": {
              backgroundColor: "#ffe9e1",
              borderColor: "#FF643A",
              transform: "translateY(-2px)",
              boxShadow: "0 4px 12px rgba(255,100,58,0.2)",
              "&::before": {
                left: "100%",
              },
            },
            "&.Mui-selected": {
              color: "#fff",
              backgroundColor: "#FF643A",
              borderColor: "#FF9472",
              transform: "scale(1.05)",
              boxShadow: "0 4px 12px rgba(255,100,58,0.3)",
              animation: "pulse 2s ease-in-out infinite",
              "@keyframes pulse": {
                "0%, 100%": {
                  boxShadow: "0 4px 12px rgba(255,100,58,0.3)",
                },
                "50%": {
                  boxShadow: "0 6px 20px rgba(255,100,58,0.5)",
                },
              },
            },
          },
          "& .MuiTabs-indicator": {
            display: "none",
          },
        }}
      >
        {categories?.map((category, index) => (
          <Tab
            key={index}
            label={category}
            sx={{
              animation: `slideIn 0.3s ease-out ${Math.min(index * 0.05, 1)}s both`,
              "@keyframes slideIn": {
                "0%": {
                  opacity: 0,
                  transform: "translateX(-12px)",
                },
                "100%": {
                  opacity: 1,
                  transform: "translateX(0)",
                },
              },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

