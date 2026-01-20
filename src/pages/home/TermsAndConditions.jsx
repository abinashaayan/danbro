import React from "react";
import { Box, Container,  Divider } from "@mui/material";
import { CustomText } from "../../components/comman/CustomText";

export const TermsAndConditions = () => {
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
          Terms & Conditions
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
            title="1. Acceptance of Terms"
            content="By accessing and using the Danbro by Mr. Brown Bakery website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
          />

          <Section
            title="2. Use License"
            content="Permission is granted to temporarily download one copy of the materials on Danbro by Mr. Brown Bakery's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose or for any public display; attempt to reverse engineer any software contained on the website; remove any copyright or other proprietary notations from the materials."
          />

          <Section
            title="3. Products and Services"
            content={
              <>
                We strive to provide accurate descriptions of our products. However, we do not warrant that product descriptions or other content on this site is accurate, complete, reliable, current, or error-free. If a product offered by us is not as described, your sole remedy is to return it in unused condition.
                <br /><br />
                All prices are subject to change without notice. We reserve the right to modify the price of any product at any time.
              </>
            }
          />

          <Section
            title="4. Orders and Payment"
            content={
              <>
                When you place an order, you are offering to purchase a product subject to these Terms & Conditions. All orders are subject to acceptance and availability.
                <ul style={{ marginTop: "12px", paddingLeft: "20px" }}>
                  <li style={{ marginBottom: "8px" }}>We reserve the right to refuse or cancel any order for any reason</li>
                  <li style={{ marginBottom: "8px" }}>Payment must be received before we process and ship your order</li>
                  <li style={{ marginBottom: "8px" }}>We accept various payment methods including credit cards, debit cards, and online payment gateways</li>
                  <li style={{ marginBottom: "8px" }}>All prices are in the currency displayed on the website</li>
                </ul>
              </>
            }
          />

          <Section
            title="5. Shipping and Delivery"
            content={
              <>
                We aim to deliver your orders in a timely manner. However:
                <ul style={{ marginTop: "12px", paddingLeft: "20px" }}>
                  <li style={{ marginBottom: "8px" }}>Delivery times are estimates and not guaranteed</li>
                  <li style={{ marginBottom: "8px" }}>We are not responsible for delays caused by third-party shipping carriers</li>
                  <li style={{ marginBottom: "8px" }}>Risk of loss and title for products pass to you upon delivery to the carrier</li>
                  <li style={{ marginBottom: "8px" }}>You are responsible for providing accurate delivery information</li>
                </ul>
              </>
            }
          />

          <Section
            title="6. Returns and Refunds"
            content={
              <>
                Our return and refund policy:
                <ul style={{ marginTop: "12px", paddingLeft: "20px" }}>
                  <li style={{ marginBottom: "8px" }}>Returns must be made within 7 days of delivery</li>
                  <li style={{ marginBottom: "8px" }}>Products must be in original, unused condition</li>
                  <li style={{ marginBottom: "8px" }}>Refunds will be processed to the original payment method</li>
                  <li style={{ marginBottom: "8px" }}>Shipping costs are non-refundable unless the product is defective or incorrect</li>
                  <li style={{ marginBottom: "8px" }}>Customized or personalized items may not be eligible for return</li>
                </ul>
              </>
            }
          />

          <Section
            title="7. Intellectual Property"
            content="All content on this website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, and software, is the property of Danbro by Mr. Brown Bakery or its content suppliers and is protected by copyright, trademark, and other intellectual property laws."
          />

          <Section
            title="8. User Accounts"
            content={
              <>
                If you create an account on our website, you are responsible for:
                <ul style={{ marginTop: "12px", paddingLeft: "20px" }}>
                  <li style={{ marginBottom: "8px" }}>Maintaining the confidentiality of your account and password</li>
                  <li style={{ marginBottom: "8px" }}>All activities that occur under your account</li>
                  <li style={{ marginBottom: "8px" }}>Providing accurate and complete information</li>
                  <li style={{ marginBottom: "8px" }}>Notifying us immediately of any unauthorized use of your account</li>
                </ul>
              </>
            }
          />

          <Section
            title="9. Prohibited Uses"
            content={
              <>
                You may not use our website:
                <ul style={{ marginTop: "12px", paddingLeft: "20px" }}>
                  <li style={{ marginBottom: "8px" }}>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li style={{ marginBottom: "8px" }}>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li style={{ marginBottom: "8px" }}>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li style={{ marginBottom: "8px" }}>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li style={{ marginBottom: "8px" }}>To submit false or misleading information</li>
                </ul>
              </>
            }
          />

          <Section
            title="10. Limitation of Liability"
            content="In no event shall Danbro by Mr. Brown Bakery, its directors, employees, or agents be liable to you for any indirect, incidental, special, punitive, or consequential damages whatsoever resulting from any errors, mistakes, or inaccuracies of content, personal injury or property damage, unauthorized access to or use of our servers, or any interruption or cessation of transmission to or from our website."
          />

          <Section
            title="11. Indemnification"
            content="You agree to defend, indemnify, and hold harmless Danbro by Mr. Brown Bakery and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees)."
          />

          <Section
            title="12. Governing Law"
            content="These Terms & Conditions shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Lucknow, India."
          />

          <Section
            title="13. Changes to Terms"
            content="We reserve the right, at our sole discretion, to modify or replace these Terms & Conditions at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion."
          />

          <Section
            title="14. Contact Information"
            content={
              <>
                If you have any questions about these Terms & Conditions, please contact us:
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

