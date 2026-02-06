import { useState, useEffect, useRef } from "react";
import { Box, TextField, Autocomplete, CircularProgress, Paper, IconButton } from "@mui/material";
import { CustomText } from "../comman/CustomText";
import SearchIcon from "@mui/icons-material/Search";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CloseIcon from "@mui/icons-material/Close";
import { getCurrentLocation, storeLocation } from "../../utils/location";
import { initGooglePlaces, getPlacePredictions, getPlaceDetails } from "../../utils/googlePlaces";
import { checkServiceAvailability } from "../../utils/apiService";

export const DeliveryCheckDialog = ({ open, onClose, initialLocationLabel = "" }) => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [serviceMessage, setServiceMessage] = useState(null);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const autocompleteRef = useRef(null);
  const debounceTimer = useRef(null);

  const hasStoredLocation = Boolean(initialLocationLabel && initialLocationLabel.trim());

  useEffect(() => {
    if (open) {
      setServiceMessage(null);
      // Pre-fill search with current selected location (same as shown in header / TopHeader)
      setInputValue(initialLocationLabel?.trim() || "");
      // Initialize Google Places when dialog opens
      initGooglePlaces().catch((error) => {
        console.error('Failed to initialize Google Places:', error);
      });

      // Prevent body scroll when dialog is open
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      return () => {
        // Restore body scroll when dialog closes
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [open, initialLocationLabel]);

  // Debounced search for autocomplete
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (inputValue.trim().length > 2) {
      debounceTimer.current = setTimeout(() => {
        setLoading(true);
        getPlacePredictions(inputValue, (predictions, status) => {
          setLoading(false);
          if (status === window.google?.maps?.places?.PlacesServiceStatus.OK && predictions) {
            setPredictions(predictions);
          } else {
            console.warn('Autocomplete status:', status, 'Predictions:', predictions);
            setPredictions([]);
          }
        });
      }, 300);
    } else {
      setPredictions([]);
    }

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [inputValue]);

  const handlePlaceSelect = async (placeId) => {
    if (!placeId) return;

    try {
      setLoading(true);
      setServiceMessage(null);
      const placeDetails = await getPlaceDetails(placeId);

      setCheckingAvailability(true);
      const availability = await checkServiceAvailability(placeDetails.lat, placeDetails.long);
      setCheckingAvailability(false);

      if (!availability.success) {
        setServiceMessage({ success: false, message: availability.message });
        return;
      }

      storeLocation(placeDetails.lat, placeDetails.long, placeDetails.address);
      window.dispatchEvent(new CustomEvent('locationUpdated', {
        detail: { lat: placeDetails.lat, long: placeDetails.long, label: placeDetails.address }
      }));
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error getting place details:', error);
      setServiceMessage({ success: false, message: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
      setCheckingAvailability(false);
    }
  };

  const handleUseCurrentLocation = async () => {
    try {
      setGettingLocation(true);
      setServiceMessage(null);
      const location = await getCurrentLocation();

      setCheckingAvailability(true);
      const availability = await checkServiceAvailability(location.lat, location.long);
      setCheckingAvailability(false);

      if (!availability.success) {
        setServiceMessage({ success: false, message: availability.message });
        return;
      }

      let addressLabel = "Selected location";
      try {
        if (window.google?.maps?.Geocoder) {
          const geocoder = new window.google.maps.Geocoder();
          const response = await new Promise((resolve) => {
            geocoder.geocode(
              { location: { lat: location.lat, lng: location.long } },
              (results, status) => {
                const ok = status === (window.google.maps.GeocoderStatus?.OK || "OK");
                if (ok && Array.isArray(results) && results[0]?.formatted_address) {
                  resolve({ results, status });
                } else {
                  resolve({ results: [], status });
                }
              }
            );
          });
          const results = response?.results;
          if (Array.isArray(results) && results[0]?.formatted_address) {
            addressLabel = results[0].formatted_address;
          }
        }
      } catch (geoError) {
        console.error("Reverse geocoding failed:", geoError);
      }

      storeLocation(location.lat, location.long, addressLabel);
      window.dispatchEvent(new CustomEvent("locationUpdated", {
        detail: { lat: location.lat, long: location.long, label: addressLabel }
      }));
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error getting current location:', error);
      setServiceMessage({ success: false, message: 'Something went wrong. Please try again.' });
    } finally {
      setGettingLocation(false);
      setCheckingAvailability(false);
    }
  };

  if (!open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10000,
        animation: "fadeIn 0.3s ease-out",
        "@keyframes fadeIn": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      }}
      onWheel={(e) => {
        // Prevent scroll on backdrop
        e.preventDefault();
        e.stopPropagation();
      }}
      onTouchMove={(e) => {
        // Prevent touch scroll on backdrop
        e.preventDefault();
        e.stopPropagation();
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: { xs: 3, md: 4 },
          width: { xs: "90%", sm: "500px", md: "600px" },
          maxWidth: "90%",
          boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
          position: "relative",
          overflow: "hidden",
          animation: "slideUp 0.3s ease-out",
          "@keyframes slideUp": {
            "0%": {
              opacity: 0,
              transform: "translateY(20px)",
            },
            "100%": {
              opacity: 1,
              transform: "translateY(0)",
            },
          },
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with title, location icons and close (when location is set) */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            position: "relative",
            mx: -3,
            mt: -3,
            px: 3,
            pt: 3,
            pb: 2,
            background: "linear-gradient(135deg, #fff5f3 0%, #ffe8e4 100%)",
            borderBottom: "1px solid rgba(211, 47, 47, 0.12)",
            borderRadius: "16px 16px 0 0",
          }}
        >
          <CustomText sx={{ fontSize: { xs: 20, md: 22 }, fontWeight: 700, color: "#333" }}>
            Enter Delivery Location
          </CustomText>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            {hasStoredLocation && (
              <IconButton
                aria-label="Close"
                onClick={onClose}
                size="small"
                sx={{
                  color: "#666",
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.06)", color: "#333" },
                }}
              >
                <CloseIcon sx={{ fontSize: 22 }} />
              </IconButton>
            )}
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5, position: "relative", width: 40, height: 50 }}>
              <LocationOnIcon sx={{ color: "#d32f2f", fontSize: 24, position: "absolute", top: 0, zIndex: 2 }} />
              <Box
                sx={{
                  width: "2px",
                  height: "24px",
                  position: "absolute",
                  top: 12,
                  background: "repeating-linear-gradient(to bottom, #d32f2f 0px, #d32f2f 4px, transparent 4px, transparent 8px)",
                  zIndex: 1,
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Search Input with Autocomplete - Popper z-index above backdrop so dropdown is visible */}
        <Autocomplete
          ref={autocompleteRef}
          freeSolo
          options={predictions}
          getOptionLabel={(option) =>
            typeof option === 'string' ? option : option.description || ''
          }
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
            if (serviceMessage) setServiceMessage(null);
          }}
          onChange={(event, newValue) => {
            if (newValue && newValue.place_id) {
              handlePlaceSelect(newValue.place_id);
            }
          }}
          loading={loading}
          slotProps={{
            popper: {
              sx: { zIndex: 10001 },
              disablePortal: false,
            },
          }}
          ListboxProps={{
            sx: {
              maxHeight: 280,
              overflow: "auto",
              "& .MuiAutocomplete-option": {
                whiteSpace: "normal",
                wordBreak: "break-word",
                alignItems: "flex-start",
                paddingTop: 1.25,
                paddingBottom: 1.25,
              },
            },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search for area/locality/pincode"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  paddingLeft: "12px",
                  "& fieldset": {
                    borderColor: "#ddd",
                  },
                  "&:hover fieldset": {
                    borderColor: "#999",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#d32f2f",
                  },
                },
                "& input": {
                  fontSize: { xs: 14, md: 16 },
                  padding: { xs: "14px 14px 14px 8px", md: "16px 16px 16px 8px" },
                },
              }}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <SearchIcon sx={{ color: "#999", mr: 1, fontSize: 20 }} />
                ),
                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          renderOption={(props, option) => (
            <Box
              component="li"
              {...props}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                py: 1.5,
                px: 2,
              }}
            >
              <LocationOnIcon sx={{ color: "#d32f2f", fontSize: 20 }} />
              <Box>
                <CustomText sx={{ fontSize: 14, fontWeight: 600 }}>
                  {option.structured_formatting?.main_text || option.description}
                </CustomText>
                {option.structured_formatting?.secondary_text && (
                  <CustomText sx={{ fontSize: 12, color: "#666" }}>
                    {option.structured_formatting.secondary_text}
                  </CustomText>
                )}
              </Box>
            </Box>
          )}
          PaperComponent={({ children, ...other }) => (
            <Paper
              {...other}
              sx={{
                mt: 1,
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                zIndex: 10002,
                overflow: "hidden",
              }}
            >
              {children}
            </Paper>
          )}
          sx={{ mb: 2 }}
        />

        {/* Service availability message */}
        {(serviceMessage || checkingAvailability) && (
          <Box
            sx={{
              mb: 2,
              p: 2,
              borderRadius: "8px",
              backgroundColor: serviceMessage?.success ? "rgba(46, 125, 50, 0.08)" : "rgba(211, 47, 47, 0.08)",
              border: `1px solid ${serviceMessage?.success ? "#2e7d32" : "#d32f2f"}`,
            }}
          >
            {checkingAvailability ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircularProgress size={18} sx={{ color: "#d32f2f" }} />
                <CustomText sx={{ fontSize: 14, color: "#666" }}>
                  Checking service availability...
                </CustomText>
              </Box>
            ) : (
              <CustomText
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: serviceMessage?.success ? "#2e7d32" : "#d32f2f",
                }}
              >
                {serviceMessage?.message}
              </CustomText>
            )}
          </Box>
        )}

        {/* Use Current Location Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
            color: "#d32f2f",
            py: 1.5,
            borderRadius: "8px",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(211, 47, 47, 0.05)",
            },
          }}
          onClick={handleUseCurrentLocation}
        >
          {gettingLocation ? (
            <CircularProgress size={20} sx={{ color: "#d32f2f" }} />
          ) : (
            <MyLocationIcon sx={{ fontSize: 20 }} />
          )}
          <CustomText
            sx={{
              fontSize: { xs: 14, md: 15 },
              fontWeight: 500,
              color: "#d32f2f",
            }}
          >
            Use my current location
          </CustomText>
        </Box>
      </Box>
    </Box>
  );
};

