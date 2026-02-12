import { Box, Grid, Typography } from "@mui/material";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

const JOB_ICON = BusinessCenterIcon;

const fadeInUpKeyframes = {
  "@keyframes fadeInUp": {
    "0%": { opacity: 0, transform: "translateY(20px)" },
    "100%": { opacity: 1, transform: "translateY(0)" },
  },
};

export function JobCard({ job, index, visible, onViewDetail }) {
  const jobId = job?._id ?? job?.id;
  const title = job?.title ?? job?.jobTitle ?? job?.name ?? "Position";
  const description = job?.description ?? job?.jobDescription ?? job?.details ?? "";
  const hoverStyle = jobId
    ? { boxShadow: "0 4px 20px rgba(0,0,0,0.1)", transform: "translateY(-2px)" }
    : {};
  const viewDetailsNode = jobId ? (
    <Typography variant="body2" sx={{ color: "#FF9472", fontSize: { xs: 12, sm: 13 }, mt: 0.5, fontWeight: 600 }}>
      View details →
    </Typography>
  ) : null;
  const cardSx = {
    border: "2px solid #FFE5E5",
    borderRadius: "10px",
    cursor: jobId ? "pointer" : "default",
    animation: visible ? `fadeInUp 0.6s ease-out ${index * 0.1}s both` : "none",
    ...fadeInUpKeyframes,
  };
  return (
    <Grid size={12}>
      <Box onClick={() => jobId && onViewDetail(jobId)} sx={cardSx}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            gap: { xs: 2, sm: 3 },
            p: 1,
            borderRadius: 3,
            transition: "all 0.3s ease",
            "&:hover": hoverStyle,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 2 }, flex: 1, width: "100%" }}>
            <Box sx={{ p: { xs: 1.2, sm: 1.5 }, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#FFE2DA", borderRadius: 2, flexShrink: 0 }}>
              <JOB_ICON sx={{ fontSize: { xs: 28, sm: 32, md: 36 }, color: "#171412" }} />
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: "#2c2c2c", fontSize: { xs: 16, sm: 18, md: 19, lg: 20 }, mb: 0.5 }}>
                {title}
              </Typography>
              <Typography variant="body2" sx={{ color: "#666", fontSize: { xs: 12, sm: 13, md: 13.5, lg: 14 } }}>{description}</Typography>
              {viewDetailsNode}
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}
