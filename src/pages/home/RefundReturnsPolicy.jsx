import React from "react";
import { Box, Container, Divider } from "@mui/material";
import { CustomText } from "../../components/comman/CustomText";

export const RefundReturnsPolicy = () => {
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
          Refund & Returns Policy
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
            title="1. Eligibility for Returns and Refunds"
            content={
              <>
                Due to the perishable nature of our products, returns and refunds are only applicable in the following cases:
                <ul style={{ marginTop: "12px", paddingLeft: "20px" }}>
                  <li style={{ marginBottom: "8px" }}>The product received is damaged, defective, or spoiled at the time of delivery.</li>
                  <li style={{ marginBottom: "8px" }}>The wrong product was delivered.</li>
                  <li style={{ marginBottom: "8px" }}>The product is missing from the package.</li>
                  <li style={{ marginBottom: "8px" }}>Quality concerns verified by our team.</li>
                </ul>
                <br />
                Products such as cakes, bread, cookies, and other perishable items are not eligible for returns due to health and safety concerns.
              </>
            }
          />

          <Section
            title="2. Reporting an Issue"
            content={
              <>
                To request a refund or replacement, customers must contact our customer support team within 6 hours of receiving the order. You can reach us via:
                <ul style={{ marginTop: "12px", paddingLeft: "20px" }}>
                  <li style={{ marginBottom: "8px" }}>Email: info@mrbrownbakery.com</li>
                  <li style={{ marginBottom: "8px" }}>Phone: +91-7309032618</li>
                </ul>
                <br />
                When reporting an issue, please provide:
                <ul style={{ marginTop: "12px", paddingLeft: "20px" }}>
                  <li style={{ marginBottom: "8px" }}>Order number</li>
                  <li style={{ marginBottom: "8px" }}>Clear images of the defective or incorrect product</li>
                  <li style={{ marginBottom: "8px" }}>A description of the issue</li>
                </ul>
              </>
            }
          />

          <Section
            title="3. Refund Process"
            content={
              <>
                If a refund request is approved, the refund will be processed as follows:
                <ul style={{ marginTop: "12px", paddingLeft: "20px" }}>
                  <li style={{ marginBottom: "8px" }}>Refunds will be issued to the original payment method within 7-10 business days.</li>
                  <li style={{ marginBottom: "8px" }}>If the payment was made via cash on delivery (COD), a store credit or voucher may be issued instead of a cash refund.</li>
                </ul>
              </>
            }
          />

          <Section
            title="4. Replacement Policy"
            content={
              <>
                If eligible, we will provide a replacement product at no additional cost.
                <br /><br />
                If the product is unavailable, customers may choose an equivalent product of the same value.
              </>
            }
          />

          <Section
            title="5. Cancellations"
            content={
              <>
                <ul style={{ marginTop: "12px", paddingLeft: "20px" }}>
                  <li style={{ marginBottom: "8px" }}>Orders can only be canceled within 1 hour of placing the order.</li>
                  <li style={{ marginBottom: "8px" }}>Once an order is processed or dispatched, it cannot be canceled.</li>
                  <li style={{ marginBottom: "8px" }}>Customized or personalized products (such as custom cakes) cannot be canceled or refunded.</li>
                </ul>
              </>
            }
          />

          <Section
            title="6. Exceptions"
            content={
              <>
                Returns and refunds will not be provided if:
                <ul style={{ marginTop: "12px", paddingLeft: "20px" }}>
                  <li style={{ marginBottom: "8px" }}>The product was consumed or discarded before reporting the issue.</li>
                  <li style={{ marginBottom: "8px" }}>The issue was reported beyond the 6-hour window.</li>
                  <li style={{ marginBottom: "8px" }}>The issue was due to incorrect handling or storage by the customer.</li>
                </ul>
              </>
            }
          />

          <Section
            title="7. Contact Us"
            content={
              <>
                For any returns or refund-related queries, please contact us at:
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
                    Email: info@mrbrownbakery.com
                  </CustomText>
                  <CustomText sx={{ fontSize: { xs: 12, md: 13 }, color: "#666" }}>
                    Phone: +91-7309032618
                  </CustomText>
                </Box>
                <br />
                By placing an order with us, you agree to the terms outlined in this Returns and Refunds Policy.
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

