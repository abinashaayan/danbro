import React from "react";
import { Box, Container, Divider } from "@mui/material";
import { CustomText } from "../../components/comman/CustomText";

export const CorporateQueries = () => {
  return (
    <Box sx={{ width: "100%", overflowX: "hidden", backgroundColor: "#fff", pb: { xs: 12, md: 0 }, p: { xs: 1.25, md: 0 } }}>
      <Container sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, md: 3 } }}>
        <CustomText
          variant="h3"
          sx={{
            fontSize: { xs: 28, sm: 32, md: 40 },
            fontWeight: 700,
            color: "var(--themeColor)",
            mb: { xs: 2, md: 3 },
            textAlign: "center",
          }}
        >
          Corporate Queries
        </CustomText>
        <CustomText
          sx={{
            fontSize: { xs: 12, sm: 13, md: 14 },
            color: "#666",
            textAlign: "center",
            mb: { xs: 1, md: 1.5 },
          }}
        >
          Mr Brown Bakery and Food Products Pvt Ltd
        </CustomText>
        <CustomText
          sx={{
            fontSize: { xs: 12, sm: 13, md: 14 },
            color: "#666",
            textAlign: "center",
            mb: { xs: 4, md: 5 },
          }}
        >
          (Brand: Danbro)
        </CustomText>
        <CustomText
          sx={{
            fontSize: { xs: 12, sm: 13, md: 14 },
            color: "#666",
            textAlign: "center",
            mb: { xs: 4, md: 5 },
          }}
        >
          Effective Date: 1 April 2025 | Last Updated: 1 April 2025
        </CustomText>

        <Box sx={{ maxWidth: "900px", mx: "auto" }}>
          <Section
            title="Introduction"
            content={
              <>
                At Mr Brown Bakery and Food Products Pvt Ltd (Brand: Danbro), we welcome corporate partnerships and inquiries for bulk orders, corporate gifting, and business collaborations. If you are looking to associate with us for your corporate requirements, we are happy to assist you.
              </>
            }
          />

          <Section
            title="1. Corporate Orders & Bulk Purchases"
            content={
              <>
                We offer customized solutions for:
                <ul style={{ marginTop: "12px", paddingLeft: "20px" }}>
                  <li style={{ marginBottom: "8px" }}>Corporate gifting (Festivals, Employee Recognition, Client Gifting, etc.)</li>
                  <li style={{ marginBottom: "8px" }}>Bulk orders for corporate events and celebrations</li>
                  <li style={{ marginBottom: "8px" }}>Customized packaging with branding options</li>
                  <li style={{ marginBottom: "8px" }}>Subscription-based snack supplies for offices</li>
                </ul>
                <br />
                For bulk orders, please provide details such as:
                <ul style={{ marginTop: "12px", paddingLeft: "20px" }}>
                  <li style={{ marginBottom: "8px" }}>Required product types and quantities</li>
                  <li style={{ marginBottom: "8px" }}>Delivery date and location</li>
                  <li style={{ marginBottom: "8px" }}>Customization or branding requirements</li>
                </ul>
              </>
            }
          />

          <Section
            title="2. Corporate Catering & Events"
            content={
              <>
                We cater to:
                <ul style={{ marginTop: "12px", paddingLeft: "20px" }}>
                  <li style={{ marginBottom: "8px" }}>Corporate meetings and conferences</li>
                  <li style={{ marginBottom: "8px" }}>Employee engagement programs</li>
                  <li style={{ marginBottom: "8px" }}>Business luncheons and high tea</li>
                  <li style={{ marginBottom: "8px" }}>Large-scale corporate celebrations</li>
                </ul>
                <br />
                We provide tailor-made menus and fresh bakery products to meet your corporate catering needs.
              </>
            }
          />

          <Section
            title="3. Business Collaborations & Partnerships"
            content={
              <>
                We welcome partnership inquiries for:
                <ul style={{ marginTop: "12px", paddingLeft: "20px" }}>
                  <li style={{ marginBottom: "8px" }}>Retail distribution and franchise opportunities</li>
                  <li style={{ marginBottom: "8px" }}>Corporate tie-ups for employee benefits programs</li>
                  <li style={{ marginBottom: "8px" }}>Collaboration with hotels, restaurants, and cafes (HORECA segment)</li>
                  <li style={{ marginBottom: "8px" }}>Institutional supply and bulk procurement</li>
                </ul>
              </>
            }
          />

          <Section
            title="4. Payment & Pricing"
            content={
              <>
                <ul style={{ marginTop: "12px", paddingLeft: "20px" }}>
                  <li style={{ marginBottom: "8px" }}>Special pricing is available for bulk and recurring corporate orders.</li>
                  <li style={{ marginBottom: "8px" }}>Payments can be made via online transfers, corporate accounts, or other pre-approved methods.</li>
                  <li style={{ marginBottom: "8px" }}>GST invoices will be provided for all corporate transactions.</li>
                </ul>
              </>
            }
          />

          <Section
            title="5. Contact Us"
            content={
              <>
                For any corporate queries, please reach out to:
                <Box sx={{ mt: 2, p: 2, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
                  <CustomText sx={{ fontSize: { xs: 13, md: 14 }, mb: 0.5, fontWeight: 600 }}>
                    Mr Brown Bakery and Food Products Pvt Ltd
                  </CustomText>
                  <CustomText sx={{ fontSize: { xs: 12, md: 13 }, mb: 0.5 }}>
                    (Brand: Danbro)
                  </CustomText>
                  <CustomText sx={{ fontSize: { xs: 12, md: 13 }, color: "#666", mb: 0.5 }}>
                    B-35, Sector-P, Aliganj, Lucknow 226024
                  </CustomText>
                  <CustomText sx={{ fontSize: { xs: 12, md: 13 }, color: "#666", mb: 0.5 }}>
                    Email: digvijai@mrbrownbakery.com
                  </CustomText>
                  <CustomText sx={{ fontSize: { xs: 12, md: 13 }, color: "#666" }}>
                    Phone: +91-7309032607
                  </CustomText>
                </Box>
              </>
            }
          />
        </Box>
      </Container>
    </Box>
  );
};

const Section = ({ title, content }) => {
  return (
    <Box sx={{ mb: { xs: 4, md: 5 } }}>
      <CustomText
        variant="h5"
        sx={{
          fontSize: { xs: 18, sm: 20, md: 24 },
          fontWeight: 700,
          color: "#2c2c2c",
          mb: { xs: 1.5, md: 2 },
        }}
      >
        {title}
      </CustomText>
      <CustomText
        sx={{
          fontSize: { xs: 14, sm: 15, md: 16 },
          color: "#555",
          lineHeight: 1.8,
        }}
      >
        {content}
      </CustomText>
      <Divider sx={{ mt: { xs: 3, md: 4 } }} />
    </Box>
  );
};

