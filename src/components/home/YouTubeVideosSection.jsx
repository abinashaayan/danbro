import { Box, Container, Grid, IconButton } from "@mui/material";
import { CustomText } from "../comman/CustomText";
import { useEffect, useRef, useState } from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import YouTubeIcon from "@mui/icons-material/YouTube";

const youtubeVideos = [
  {
    id: 1,
    videoId: "33d42UTJRzo",
    title: "Danbro Bakery Story",
    thumbnail: `https://img.youtube.com/vi/33d42UTJRzo/maxresdefault.jpg`,
  },
  {
    id: 2,
    videoId: "rYRDiLcCj4Q",
    title: "Our Bakery Products",
    thumbnail: `https://img.youtube.com/vi/rYRDiLcCj4Q/maxresdefault.jpg`,
  },
  {
    id: 3,
    videoId: "s1TvejLsfXU",
    title: "Customer Experience",
    thumbnail: `https://img.youtube.com/vi/s1TvejLsfXU/maxresdefault.jpg`,
  },
  {
    id: 4,
    videoId: "gjOQ8Fo4xWs",
    title: "Behind the Scenes",
    thumbnail: `https://img.youtube.com/vi/gjOQ8Fo4xWs/maxresdefault.jpg`,
  },
];

export const YouTubeVideosSection = () => {
  const [visible, setVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [hoveredVideoId, setHoveredVideoId] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const openVideo = (videoId) => {
    setSelectedVideo(videoId);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <>
      <Box
        ref={sectionRef}
        sx={{
          position: "relative",
          overflow: "hidden",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(50px)",
          transition: "opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
          <Box sx={{ textAlign: "center", mb: { xs: 2, md: 4 } }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 70,
                height: 70,
                borderRadius: "50%",
                bgcolor: "rgba(255, 0, 0, 0.1)",
                mb: 1,
                animation: visible ? "pulseIcon 2s ease-in-out infinite" : "none",
                "@keyframes pulseIcon": {
                  "0%, 100%": { transform: "scale(1)" },
                  "50%": { transform: "scale(1.1)" },
                },
              }}
            >
              <YouTubeIcon sx={{ fontSize: 40, color: "#FF0000" }} />
            </Box>
            <CustomText
              sx={{
                fontSize: { xs: 12, md: 14 },
                fontWeight: 600,
                color: "#FF9472",
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              Watch Our Videos
            </CustomText>
            <CustomText
              sx={{
                fontSize: { xs: 32, sm: 38, md: 48 },
                fontWeight: 800,
                color: "var(--themeColor)"
              }}
            >
              Discover Danbro Bakery
            </CustomText>
            <CustomText
              sx={{
                fontSize: { xs: 14, md: 16 },
                color: "#666",
                maxWidth: 600,
                mx: "auto",
              }}
            >
              Watch our journey, see our products, and experience the passion behind every creation
            </CustomText>
          </Box>

          {/* Videos Grid */}
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {youtubeVideos.map((video, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={video.id}>
                <Box
                  onClick={() => openVideo(video.videoId)}
                  onMouseEnter={() => setHoveredVideoId(video.videoId)}
                  onMouseLeave={() => setHoveredVideoId(null)}
                  sx={{
                    position: "relative",
                    borderRadius: 3,
                    overflow: "hidden",
                    cursor: "pointer",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
                    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(50px)",
                    animation: visible ? `fadeInUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s both` : "none",
                    "@keyframes fadeInUp": {
                      "0%": { opacity: 0, transform: "translateY(50px)" },
                      "100%": { opacity: 1, transform: "translateY(0)" },
                    },
                    "&:hover": {
                      transform: "translateY(-10px) scale(1.02)",
                      boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
                      "& .video-thumbnail": {
                        transform: "scale(1.1)",
                      },
                      "& .play-button": {
                        transform: "scale(1.2)",
                        bgcolor: "rgba(255, 0, 0, 0.9)",
                      },
                    },
                  }}
                >
                  {/* Thumbnail or playing video on hover */}
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: { xs: 200, sm: 220, md: 240 },
                      overflow: "hidden",
                      bgcolor: "#000",
                    }}
                  >
                    {hoveredVideoId === video.videoId ? (
                      <Box
                        component="iframe"
                        src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&mute=1&rel=0`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          border: "none",
                          pointerEvents: "auto",
                        }}
                      />
                    ) : (
                      <>
                        <Box
                          className="video-thumbnail"
                          component="img"
                          src={video.thumbnail}
                          alt={video.title}
                          onError={(e) => {
                            e.target.src = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
                          }}
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                          }}
                        />
                        {/* Overlay */}
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <IconButton
                            className="play-button"
                            sx={{
                              bgcolor: "rgba(255, 0, 0, 0.8)",
                              color: "#fff",
                              width: { xs: 70, md: 80 },
                              height: { xs: 70, md: 80 },
                              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                              boxShadow: "0 8px 25px rgba(255, 0, 0, 0.4)",
                              "&:hover": {
                                bgcolor: "rgba(255, 0, 0, 0.95)",
                              },
                            }}
                          >
                            <PlayCircleIcon sx={{ fontSize: { xs: 50, md: 60 } }} />
                          </IconButton>
                        </Box>
                      </>
                    )}

                    {/* YouTube Badge - show when not playing */}
                    {hoveredVideoId !== video.videoId && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          bgcolor: "#FF0000",
                          color: "#fff",
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                      >
                        <YouTubeIcon sx={{ fontSize: 16 }} />
                        YouTube
                      </Box>
                    )}
                  </Box>

                  {/* Video Title */}
                  <Box sx={{ p: 2.5, bgcolor: "#fff" }}>
                    <CustomText
                      sx={{
                        fontSize: { xs: 16, md: 18 },
                        fontWeight: 700,
                        color: "var(--themeColor)",
                        textAlign: "center",
                      }}
                    >
                      {video.title}
                    </CustomText>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Video Modal */}
      {selectedVideo && (
        <Box
          onClick={closeVideo}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: "rgba(0, 0, 0, 0.9)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: { xs: 2, md: 4 },
            animation: "fadeIn 0.3s ease",
            "@keyframes fadeIn": {
              "0%": { opacity: 0 },
              "100%": { opacity: 1 },
            },
          }}
        >
          <Box
            onClick={(e) => e.stopPropagation()}
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: { xs: "100%", md: "900px" },
              aspectRatio: "16/9",
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              animation: "scaleIn 0.3s ease",
              "@keyframes scaleIn": {
                "0%": { transform: "scale(0.9)", opacity: 0 },
                "100%": { transform: "scale(1)", opacity: 1 },
              },
            }}
          >
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            />
            <IconButton
              onClick={closeVideo}
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                bgcolor: "rgba(0, 0, 0, 0.7)",
                color: "#fff",
                "&:hover": {
                  bgcolor: "rgba(0, 0, 0, 0.9)",
                },
              }}
            >
              ×
            </IconButton>
          </Box>
        </Box>
      )}
    </>
  );
};

