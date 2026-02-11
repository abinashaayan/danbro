import { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Autocomplete,
  CircularProgress,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { CustomText } from "../comman/CustomText";
import SearchIcon from "@mui/icons-material/Search";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CloseIcon from "@mui/icons-material/Close";
import { getCurrentLocation, storeLocation } from "../../utils/location";
import { initGooglePlaces, getPlacePredictions, getPlaceDetails, getShortAddressFromComponents } from "../../utils/googlePlaces";
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
                if (ok && Array.isArray(results) && results.length > 0) {
                  resolve({ results, status });
                } else {
                  resolve({ results: [], status });
                }
              }
            );
          });
          const results = response?.results;
          if (Array.isArray(results) && results[0]) {
            const first = results[0];
            const shortAddr = getShortAddressFromComponents(first.address_components || []);
            addressLabel = shortAddr || first.formatted_address || addressLabel;
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
      if (error?.message === 'PERMISSION_DENIED') {
        setServiceMessage({
          success: false,
          message:
            'Location access is not supported on this domain.'
        });
      } else {
        setServiceMessage({ success: false, message: 'Something went wrong. Please try again.' });
      }
    } finally {
      setGettingLocation(false);
      setCheckingAvailability(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      scroll="paper"
      aria-labelledby="delivery-location-modal-label"
      aria-hidden={!open}
      PaperProps={{
        sx: {
          borderRadius: "16px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
          maxWidth: { xs: "90vw", sm: 500, md: 560 },
          margin: { xs: 1, sm: 2 },
        },
      }}
      slotProps={{
        backdrop: {
          sx: { backdropFilter: "blur(4px)" },
        },
      }}
      sx={{ zIndex: 10000 }}
    >
      {/* modal-header */}
      <DialogTitle
        id="delivery-location-modal-label"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 2, sm: 3 },
          py: 2,
          borderBottom: "1px solid rgba(211, 47, 47, 0.12)",
          background: "linear-gradient(135deg, #fff5f3 0%, #ffe8e4 100%)",
          "& .MuiDialogTitle-root": { flex: 1 },
        }}
      >
        <CustomText component="span" sx={{ fontSize: { xs: 18, md: 20 }, fontWeight: 700, color: "#333" }}>
          Enter Delivery Location
        </CustomText>
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
      </DialogTitle>

      {/* modal-body */}
      <DialogContent sx={{ px: { xs: 2, sm: 3 }, mt: 2.5, pb: 1 }}>
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
      </DialogContent>

      {/* modal-footer */}
      <DialogActions sx={{ px: { xs: 2, sm: 3 }, py: 2, borderTop: "1px solid #eee", gap: 1 }}>
        <Button onClick={onClose} color="inherit" sx={{ textTransform: "none" }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

