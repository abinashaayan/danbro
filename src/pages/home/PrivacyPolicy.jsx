import React from "react";
import { Box, Container,  Divider } from "@mui/material";
import { CustomText } from "../../components/comman/CustomText";

export const PrivacyPolicy = () => {
  return (
    <Box sx={{ width: "100%", overflowX: "hidden", backgroundColor: "#fff", pb: { xs: 12, md: 0 }, p: { xs: 1.25, md: 0 } }}>
      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, md: 3 } }}>
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
          Privacy Policy
        </CustomText>
        <CustomText
          sx={{
            fontSize: { xs: 12, sm: 13, md: 14 },
            color: "#666",
            textAlign: "center",
            mb: { xs: 4, md: 5 },
          }}
        >
          Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </CustomText>

        <Box sx={{ maxWidth: "900px", mx: "auto" }}>
          <Section
            title="1. Introduction"
            content="At Danbro by Mr. Brown Bakery, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or interact with us."
          />

          <Section
            title="2. Information We Collect"
            content={
              <>
                We may collect information about you in a variety of ways. The information we may collect includes:
                <ul style={{ marginTop: "12px", paddingLeft: "20px" }}>
                  <li style={{ marginBottom: "8px" }}>Personal Information: Name, email address, phone number, billing and shipping addresses</li>
                  <li style={{ marginBottom: "8px" }}>Payment Information: Credit card details, billing information (processed securely through third-party payment processors)</li>
                  <li style={{ marginBottom: "8px" }}>Account Information: Username, password, preferences, and order history</li>
                  <li style={{ marginBottom: "8px" }}>Device Information: IP address, browser type, device type, and operating system</li>
                  <li style={{ marginBottom: "8px" }}>Usage Data: Pages visited, time spent on pages, and interaction with our website</li>
                </ul>
              </>
            }
          />

          <Section
            title="3. How We Use Your Information"
            content={
              <>
                We use the information we collect to:
                <ul style={{ marginTop: "12px", paddingLeft: "20px" }}>
                  <li style={{ marginBottom: "8px" }}>Process and fulfill your orders</li>
                  <li style={{ marginBottom: "8px" }}>Communicate with you about your orders, products, and services</li>
                  <li style={{ marginBottom: "8px" }}>Send you marketing communications (with your consent)</li>
                  <li style={{ marginBottom: "8px" }}>Improve our website, products, and services</li>
                  <li style={{ marginBottom: "8px" }}>Prevent fraud and ensure security</li>
                  <li style={{ marginBottom: "8px" }}>Comply with legal obligations</li>
                </ul>
              </>
            }
          />

          <Section
            title="4. Information Sharing and Disclosure"
            content="We do not sell your personal information. We may share your information with trusted third-party service providers who assist us in operating our website, conducting our business, or serving our users, as long as those parties agree to keep this information confidential. We may also disclose information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety."
          />

          <Section
            title="5. Data Security"
            content="We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security."
          />

          <Section
            title="6. Your Rights"
            content={
              <>
                You have the right to:
                <ul style={{ marginTop: "12px", paddingLeft: "20px" }}>
                  <li style={{ marginBottom: "8px" }}>Access and receive a copy of your personal data</li>
                  <li style={{ marginBottom: "8px" }}>Rectify inaccurate or incomplete data</li>
                  <li style={{ marginBottom: "8px" }}>Request deletion of your personal data</li>
                  <li style={{ marginBottom: "8px" }}>Object to processing of your personal data</li>
                  <li style={{ marginBottom: "8px" }}>Request restriction of processing</li>
                  <li style={{ marginBottom: "8px" }}>Withdraw consent at any time</li>
                </ul>
              </>
            }
          />

          <Section
            title="7. Cookies and Tracking Technologies"
            content="We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent."
          />

          <Section
            title="8. Third-Party Links"
            content="Our website may contain links to third-party websites. We are not responsible for the privacy practices or the content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit."
          />

          <Section
            title="9. Children's Privacy"
            content="Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately."
          />

          <Section
            title="10. Changes to This Privacy Policy"
            content="We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Last Updated' date. You are advised to review this Privacy Policy periodically for any changes."
          />

          <Section
            title="11. Contact Us"
            content={
              <>
                If you have any questions about this Privacy Policy, please contact us:
                <Box sx={{ mt: 2, p: 2, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
                  <CustomText sx={{ fontSize: { xs: 13, md: 14 }, mb: 0.5, fontWeight: 600 }}>
                    Danbro by Mr. Brown Bakery
                  </CustomText>
                  <CustomText sx={{ fontSize: { xs: 12, md: 13 }, color: "#666" }}>
                    Email: info@mrbrownbakery.com
                  </CustomText>
                  <CustomText sx={{ fontSize: { xs: 12, md: 13 }, color: "#666" }}>
                    Phone: +91-7309010623
                  </CustomText>
                  <CustomText sx={{ fontSize: { xs: 12, md: 13 }, color: "#666" }}>
                    Address: B-35, Sector-P, Aliganj, Lucknow 226024
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

