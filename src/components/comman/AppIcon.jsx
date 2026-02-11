import { Box } from "@mui/material";

/**
 * Wraps a Lucide icon with bakery site defaults: thin stroke, soft pastel color, subtle shadow.
 * Use for consistent icon styling across the app.
 */
export function AppIcon({ as: Icon, size = 24, strokeWidth = 1.5, sx, color, ...rest }) {
  if (!Icon) return null;
  return (
    <Box
      component="span"
      className="app-icon"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: color ?? "var(--iconColor)",
        filter: "drop-shadow(var(--iconShadow))",
        ...sx,
      }}
    >
      <Icon size={size} strokeWidth={strokeWidth} {...rest} />
    </Box>
  );
}

export default AppIcon;
