import { Box } from "@mui/material";

/**
 * BackgroundDecorations Component
 * Adds subtle cartoon-style bakery images as background decorations
 * 
 * To use actual cartoon images:
 * 1. Add your cartoon bakery images to src/assets folder
 * 2. Import them at the top: import bakery1 from "../../assets/bakery-cartoon-1.png";
 * 3. Replace the backgroundImage URLs with the imported images
 */
export const BackgroundDecorations = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {/* Top Left Decoration - Cupcake/Cake */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: "8%", md: "6%" },
          left: { xs: "-2%", md: "3%" },
          width: { xs: "140px", md: "200px", lg: "250px" },
          height: { xs: "140px", md: "200px", lg: "250px" },
          opacity: 0.12,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 120'%3E%3Cpath d='M50 10 Q45 5 40 10 L35 30 Q30 35 35 40 L40 50 Q45 55 50 50 Q55 55 60 50 L65 40 Q70 35 65 30 L60 10 Q55 5 50 10 Z' fill='%23FF9472'/%3E%3Ccircle cx='50' cy='20' r='8' fill='%23fff'/%3E%3Cpath d='M50 50 L45 80 L55 80 Z' fill='%23D4A574'/%3E%3C/svg%3E")`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          filter: "drop-shadow(0 4px 8px rgba(255,148,114,0.15))",
          transform: "rotate(-12deg)",
          animation: "float1 25s ease-in-out infinite",
          "@keyframes float1": {
            "0%, 100%": { transform: "rotate(-12deg) translateY(0px) translateX(0px)" },
            "50%": { transform: "rotate(-12deg) translateY(-15px) translateX(10px)" },
          },
        }}
      />

      {/* Top Right Decoration - Donut */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: "12%", md: "10%" },
          right: { xs: "-2%", md: "3%" },
          width: { xs: "120px", md: "180px", lg: "230px" },
          height: { xs: "120px", md: "180px", lg: "230px" },
          opacity: 0.12,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='35' fill='%23D4A574'/%3E%3Ccircle cx='50' cy='50' r='20' fill='%23fff'/%3E%3Ccircle cx='50' cy='50' r='18' fill='%23FF9472'/%3E%3Ccircle cx='45' cy='45' r='2' fill='%23fff'/%3E%3Ccircle cx='55' cy='45' r='2' fill='%23fff'/%3E%3C/svg%3E")`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          filter: "drop-shadow(0 4px 8px rgba(255,148,114,0.15))",
          transform: "rotate(18deg)",
          animation: "float2 28s ease-in-out infinite",
          "@keyframes float2": {
            "0%, 100%": { transform: "rotate(18deg) translateY(0px) translateX(0px)" },
            "50%": { transform: "rotate(18deg) translateY(-20px) translateX(-8px)" },
          },
        }}
      />

      {/* Middle Left Decoration - Cake Slice */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: "42%", md: "38%" },
          left: { xs: "-3%", md: "2%" },
          width: { xs: "110px", md: "170px", lg: "210px" },
          height: { xs: "110px", md: "170px", lg: "210px" },
          opacity: 0.1,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M20 80 L50 20 L80 80 Z' fill='%23FF9472'/%3E%3Cpath d='M25 75 L50 25 L75 75 Z' fill='%23fff'/%3E%3Cpath d='M30 70 L50 30 L70 70 Z' fill='%23FFB5A1'/%3E%3Ccircle cx='50' cy='25' r='3' fill='%23FF6B6B'/%3E%3C/svg%3E")`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          filter: "drop-shadow(0 4px 8px rgba(255,148,114,0.15))",
          transform: "rotate(-22deg)",
          animation: "float3 32s ease-in-out infinite",
          "@keyframes float3": {
            "0%, 100%": { transform: "rotate(-22deg) translateY(0px) translateX(0px)" },
            "50%": { transform: "rotate(-22deg) translateY(-18px) translateX(12px)" },
          },
        }}
      />

      {/* Middle Right Decoration - Cookie */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: "48%", md: "44%" },
          right: { xs: "-3%", md: "2%" },
          width: { xs: "130px", md: "190px", lg: "240px" },
          height: { xs: "130px", md: "190px", lg: "240px" },
          opacity: 0.1,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%23D4A574'/%3E%3Ccircle cx='50' cy='50' r='35' fill='%23E8C99B'/%3E%3Ccircle cx='35' cy='40' r='3' fill='%23654A2E'/%3E%3Ccircle cx='50' cy='35' r='3' fill='%23654A2E'/%3E%3Ccircle cx='65' cy='40' r='3' fill='%23654A2E'/%3E%3Ccircle cx='40' cy='55' r='3' fill='%23654A2E'/%3E%3Ccircle cx='60' cy='55' r='3' fill='%23654A2E'/%3E%3Ccircle cx='50' cy='65' r='3' fill='%23654A2E'/%3E%3C/svg%3E")`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          filter: "drop-shadow(0 4px 8px rgba(255,148,114,0.15))",
          transform: "rotate(14deg)",
          animation: "float4 26s ease-in-out infinite",
          "@keyframes float4": {
            "0%, 100%": { transform: "rotate(14deg) translateY(0px) translateX(0px)" },
            "50%": { transform: "rotate(14deg) translateY(-22px) translateX(-10px)" },
          },
        }}
      />

      {/* Bottom Left Decoration - Bread */}
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: "8%", md: "6%" },
          left: { xs: "-2%", md: "3%" },
          width: { xs: "150px", md: "220px", lg: "270px" },
          height: { xs: "90px", md: "140px", lg: "170px" },
          opacity: 0.12,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 60'%3E%3Cellipse cx='50' cy='30' rx='45' ry='25' fill='%23D4A574'/%3E%3Cpath d='M10 30 Q15 25 20 30 Q25 35 30 30 Q35 25 40 30 Q45 35 50 30 Q55 25 60 30 Q65 35 70 30 Q75 25 80 30 Q85 35 90 30' stroke='%23B8956A' stroke-width='2' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          filter: "drop-shadow(0 4px 8px rgba(255,148,114,0.15))",
          transform: "rotate(8deg)",
          animation: "float5 30s ease-in-out infinite",
          "@keyframes float5": {
            "0%, 100%": { transform: "rotate(8deg) translateY(0px) translateX(0px)" },
            "50%": { transform: "rotate(8deg) translateY(-16px) translateX(8px)" },
          },
        }}
      />

      {/* Bottom Right Decoration - Pie */}
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: "10%", md: "8%" },
          right: { xs: "-2%", md: "3%" },
          width: { xs: "120px", md: "180px", lg: "230px" },
          height: { xs: "120px", md: "180px", lg: "230px" },
          opacity: 0.12,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%23D4A574'/%3E%3Cpath d='M50 50 L50 10 A40 40 0 0 1 85 35 Z' fill='%23FF9472'/%3E%3Ccircle cx='50' cy='50' r='3' fill='%23654A2E'/%3E%3Ccircle cx='65' cy='40' r='2' fill='%23654A2E'/%3E%3Ccircle cx='70' cy='55' r='2' fill='%23654A2E'/%3E%3Cpath d='M50 10 L50 8 L52 8 L52 10' stroke='%23B8956A' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          filter: "drop-shadow(0 4px 8px rgba(255,148,114,0.15))",
          transform: "rotate(-16deg)",
          animation: "float6 27s ease-in-out infinite",
          "@keyframes float6": {
            "0%, 100%": { transform: "rotate(-16deg) translateY(0px) translateX(0px)" },
            "50%": { transform: "rotate(-16deg) translateY(-19px) translateX(-9px)" },
          },
        }}
      />

      {/* Center Background Pattern (Very Subtle Radial Gradient) */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "500px", md: "700px", lg: "900px" },
          height: { xs: "500px", md: "700px", lg: "900px" },
          opacity: 0.08,
          background: "radial-gradient(circle, rgba(255,148,114,0.25) 0%, rgba(255,148,114,0.15) 50%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(45px)",
        }}
      />

      {/* Additional scattered small decorations */}
      {[...Array(6)].map((_, index) => (
        <Box
          key={index}
          sx={{
            position: "absolute",
            top: `${15 + index * 12}%`,
            left: index % 2 === 0 ? `${5 + index * 8}%` : "auto",
            right: index % 2 === 1 ? `${5 + (index - 1) * 8}%` : "auto",
            width: { xs: "60px", md: "80px", lg: "100px" },
            height: { xs: "60px", md: "80px", lg: "100px" },
            opacity: 0.08,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Ccircle cx='10' cy='10' r='8' fill='%23FF9472'/%3E%3C/svg%3E")`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            transform: `rotate(${index * 15}deg)`,
            animation: `floatSmall${index} ${20 + index * 3}s ease-in-out infinite`,
            [`@keyframes floatSmall${index}`]: {
              "0%, 100%": { transform: `rotate(${index * 15}deg) translateY(0px)` },
              "50%": { transform: `rotate(${index * 15 + 5}deg) translateY(-10px)` },
            },
          }}
        />
      ))}
    </Box>
  );
};
