import React, { useState } from "react";
import {
  Card,
  CardContent,
  Box,
  Button,
  CircularProgress,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { CustomText } from "../comman/CustomText";
import { AddressFormDialog } from "../user/AddressFormDialog";
import { getAccessToken } from "../../utils/cookies";

export const AddressSection = ({
  addresses,
  selectedAddress,
  setSelectedAddress,
  addressesLoading,
  addressDialogOpen,
  setAddressDialogOpen,
  handleAddressSuccess,
  deliveryType,
  setDeliveryType,
  someoneElseData,
  setSomeoneElseData,
}) => {
  const formatAddress = (address) => {
    const parts = [];
    if (address.houseNumber) parts.push(address.houseNumber);
    if (address.streetName) parts.push(address.streetName);
    if (address.area) parts.push(address.area);
    if (address.landmark) parts.push(`Near ${address.landmark}`);
    if (address.city) parts.push(address.city);
    if (address.state) parts.push(address.state);
    if (address.zipCode) parts.push(address.zipCode);
    return parts.join(", ");
  };

  const handleSomeoneElseChange = (field) => (event) => {
    setSomeoneElseData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const isSomeoneElseFormValid = () => {
    return someoneElseData.name && 
           someoneElseData.phone && 
           someoneElseData.address && 
           someoneElseData.city && 
           someoneElseData.state && 
           someoneElseData.pincode;
  };

  const token = getAccessToken();
  
  // Don't render address section for guest users
  if (!token) {
    return null;
  }

  return (
    <Card
      sx={{
        borderRadius: { xs: 2, md: 2.5 },
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        position: { md: "sticky" },
        top: { md: 100 },
        mb: 2,
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
        <CustomText
          sx={{
            fontSize: { xs: 18, md: 22 },
            fontWeight: 700,
            color: "#2c2c2c",
            mb: { xs: 1.5, md: 2 },
          }}
        >
          Delivery Address
        </CustomText>

        {/* Delivery Type Radio Buttons */}
        <RadioGroup
          value={deliveryType}
          onChange={(e) => setDeliveryType(e.target.value)}
          sx={{ mb: 2 }}
        >
          <FormControlLabel
            value="self"
            control={<Radio sx={{ color: "var(--themeColor)" }} />}
            label={
              <CustomText sx={{ fontSize: { xs: 14, md: 16 }, fontWeight: 500 }}>
                Deliver to My Address
              </CustomText>
            }
          />
          <FormControlLabel
            value="someone_else"
            control={<Radio sx={{ color: "var(--themeColor)" }} />}
            label={
              <CustomText sx={{ fontSize: { xs: 14, md: 16 }, fontWeight: 500 }}>
                Deliver to Someone Else
              </CustomText>
            }
          />
        </RadioGroup>

        {/* Self Address Section */}
        {deliveryType === 'self' && (
          <>
            {addressesLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 1.5 }}>
                <CircularProgress size={20} />
              </Box>
            ) : addresses.length === 0 ? (
              <Box sx={{ mb: 1.5 }}>
                <CustomText sx={{ fontSize: { xs: 13, md: 14 }, color: "#666", mb: 1.5 }}>
                  No saved addresses. Please add an address.
                </CustomText>
                <Button
                  variant="outlined"
                  onClick={() => setAddressDialogOpen(true)}
                  sx={{
                    borderColor: "var(--themeColor)",
                    color: "var(--themeColor)",
                    textTransform: "none",
                    fontSize: { xs: 12, md: 13 },
                    py: 0.8,
                    "&:hover": {
                      borderColor: "var(--themeColor)",
                      backgroundColor: "#fbeeee",
                    },
                  }}
                >
                  Add Address
                </Button>
              </Box>
            ) : (
              <RadioGroup
                value={selectedAddress || ""}
                onChange={(e) => setSelectedAddress(e.target.value)}
                sx={{ mb: 1.5 }}
              >
                {addresses.map((address) => {
                  const addressId = address._id || address.id;
                  return (
                    <Card
                      key={addressId}
                      sx={{
                        mb: 1.5,
                        border: selectedAddress === addressId ? "2px solid var(--themeColor)" : "1px solid #ddd",
                        borderRadius: 2,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        },
                      }}
                    >
                      <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
                        <FormControlLabel
                          value={addressId}
                          control={<Radio sx={{ color: "var(--themeColor)" }} />}
                          label={
                            <Box>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                                <CustomText sx={{ fontWeight: 600, fontSize: { xs: 14, md: 16 } }}>
                                  {address.addressType || "Address"}
                                </CustomText>
                                {address.isDefault && (
                                  <Box
                                    sx={{
                                      px: 1,
                                      py: 0.2,
                                      borderRadius: 1,
                                      backgroundColor: "#FFB5A1",
                                      color: "#000",
                                      fontSize: 10,
                                      fontWeight: 600,
                                    }}
                                  >
                                    Default
                                  </Box>
                                )}
                              </Box>
                              <CustomText sx={{ fontSize: { xs: 12, md: 14 }, color: "#666" }}>
                                {formatAddress(address)}
                              </CustomText>
                            </Box>
                          }
                          sx={{ width: "100%", m: 0, alignItems: "flex-start" }}
                        />
                      </CardContent>
                    </Card>
                  );
                })}
              </RadioGroup>
            )}
            
            {/* Add New Address Button */}
            <Button
              variant="outlined"
              fullWidth
              onClick={() => setAddressDialogOpen(true)}
              sx={{
                borderColor: "var(--themeColor)",
                color: "var(--themeColor)",
                textTransform: "none",
                mt: 1.5,
                py: 1,
                fontSize: { xs: 13, md: 14 },
                fontWeight: 600,
                "&:hover": {
                  borderColor: "var(--themeColor)",
                  backgroundColor: "#fbeeee",
                },
              }}
            >
              Add New Address
            </Button>
          </>
        )}

        {/* Someone Else Form Section */}
        {deliveryType === 'someone_else' && (
          <Box sx={{ mb: 1.5 }}>
            <CustomText sx={{ fontSize: { xs: 14, md: 16 }, fontWeight: 600, color: "#2c2c2c", mb: 2 }}>
              Recipient Details
            </CustomText>
            
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                fullWidth
                size="small"
                label="Recipient Name"
                value={someoneElseData.name}
                onChange={handleSomeoneElseChange('name')}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
              
              <TextField
                fullWidth
                size="small"
                label="Phone Number"
                value={someoneElseData.phone}
                onChange={handleSomeoneElseChange('phone')}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
              
              <TextField
                fullWidth
                size="small"
                label="Delivery Address"
                value={someoneElseData.address}
                onChange={handleSomeoneElseChange('address')}
                multiline
                rows={2}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
              
              <TextField
                fullWidth
                size="small"
                label="Landmark (Optional)"
                value={someoneElseData.landmark}
                onChange={handleSomeoneElseChange('landmark')}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
              
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="City"
                  value={someoneElseData.city}
                  onChange={handleSomeoneElseChange('city')}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
                
                <TextField
                  fullWidth
                  size="small"
                  label="State"
                  value={someoneElseData.state}
                  onChange={handleSomeoneElseChange('state')}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
                
                <TextField
                  fullWidth
                  size="small"
                  label="PIN Code"
                  value={someoneElseData.pincode}
                  onChange={handleSomeoneElseChange('pincode')}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
              </Box>
            </Box>
            
            {!isSomeoneElseFormValid() && (
              <CustomText sx={{ fontSize: 12, color: "#d32f2f", mt: 1 }}>
                Please fill all required fields
              </CustomText>
            )}
          </Box>
        )}
      </CardContent>

      {/* Address Form Dialog */}
      <AddressFormDialog
        open={addressDialogOpen}
        onClose={() => setAddressDialogOpen(false)}
        onSuccess={handleAddressSuccess}
      />
    </Card>
  );
};
