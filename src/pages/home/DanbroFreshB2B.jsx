import { useState, useMemo } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { CustomText } from "../../components/comman/CustomText";
import blankImage from "../../assets/blankimage.png";

const BORDER_COLOR = "#f8b4c4";
const ACTIVE_TAB_BG = "#c62828";
const BANNER_BG = "#fff5f7";

const B2B_CATEGORIES = ["ALL", "PREMIUM NUTS", "PREMIUM MAKHANA", "PREMIUM NAMKEEN", "PREMIUM CHIPS"];

const B2B_PRODUCTS = [
  {
    id: 1,
    name: "Salted Pista",
    category: "PREMIUM NUTS",
    image: blankImage,
    veg: true,
  },
  {
    id: 2,
    name: "Salted Nut Mix",
    category: "PREMIUM NUTS",
    image: blankImage,
    veg: true,
  },
  {
    id: 3,
    name: "Salted Cashews",
    category: "PREMIUM NUTS",
    image: blankImage,
    veg: true,
  },
  {
    id: 4,
    name: "Salted Almond",
    category: "PREMIUM NUTS",
    image: blankImage,
    veg: true,
  },
];

const MENU_ROWS = [
  {
    id: 1,
    product: "Salted Pista Gift Box (100g)",
    unit: "Pcs",
    mrp: 360,
    gst: 12,
    basePrice: 321.42,
    taxes: 38.57,
    minOrderQty: 100,
  },
  {
    id: 2,
    product: "Salted Nut Mix Gift Pack (100g)",
    unit: "Pcs",
    mrp: 390,
    gst: 12,
    basePrice: 348.21,
    taxes: 41.78,
    minOrderQty: 100,
  },
];

export const DanbroFreshB2B = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [form, setForm] = useState({ name: "", mobile: "", email: "" });
  const [menuRows, setMenuRows] = useState(
    MENU_ROWS.map((row) => ({ ...row, requiredQty: "", discount: "", lineTotal: 0 }))
  );

  const filteredProducts = useMemo(() => {
    const cat = B2B_CATEGORIES[activeTab];
    if (cat === "ALL") return B2B_PRODUCTS;
    return B2B_PRODUCTS.filter((p) => p.category === cat);
  }, [activeTab]);

  const updateRow = (index, field, value) => {
    setMenuRows((prev) => {
      const next = [...prev];
      const row = { ...next[index], [field]: value };
      const qty = Number(row.requiredQty) || 0;
      const discount = Number(row.discount) || 0;
      const base = row.basePrice || 0;
      const tax = row.taxes || 0;
      if (qty > 0) {
        const afterDiscount = base * (1 - discount / 100);
        row.lineTotal = (afterDiscount + tax) * qty;
      } else {
        row.lineTotal = 0;
      }
      next[index] = row;
      return next;
    });
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("B2B form submit", { form, menuRows });
  };

  return (
    <Box sx={{ bgcolor: "#fff", minHeight: "100vh", pb: 6 }}>
      <Container maxWidth="lg" sx={{ py: 4, px: { xs: 2, sm: 3 } }}>
        {/* Brand section */}
        <CustomText
          component="h1"
          sx={{
            fontSize: { xs: 24, sm: 28, md: 32 },
            fontWeight: 700,
            color: "#2c2c2c",
            fontFamily: "'Inter', sans-serif",
            mb: 0.5,
          }}
        >
          Brand: Danbro Express
        </CustomText>
        <CustomText
          sx={{
            fontSize: { xs: 14, sm: 15 },
            color: "#666",
            fontFamily: "'Inter', sans-serif",
            mb: 3,
          }}
        >
          Mr Brown Bakery and Food Products Pvt Ltd
        </CustomText>
        <Box sx={{ mb: 4 }}>
          <CustomText
            sx={{
              fontSize: { xs: 14, sm: 15 },
              color: "#444",
              lineHeight: 1.8,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <Box component="span" sx={{ fontWeight: 700 }}>Danbro Express</Box> is your dedicated B2B channel from{" "}
            <Box component="span" sx={{ fontWeight: 700 }}>Danbro by Mr. Brown</Box>. Explore our{" "}
            <Box
              component="span"
              sx={{
                fontWeight: 700,
                color: "var(--themeColor)",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => scrollToSection("product-catalogue")}
            >
              product catalogue
            </Box>{" "}
            and submit your requirements via the{" "}
            <Box
              component="span"
              sx={{
                fontWeight: 700,
                color: "var(--themeColor)",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => scrollToSection("request-form")}
            >
              request form
            </Box>
            .
          </CustomText>
          <CustomText
            sx={{
              fontSize: { xs: 14, sm: 15 },
              color: "#444",
              lineHeight: 1.8,
              fontFamily: "'Inter', sans-serif",
              mt: 1.5,
              fontStyle: "italic",
            }}
          >
            <Box component="span" sx={{ fontWeight: 700 }}>Danbro Express</Box> – Because your business deserves nothing but the best.
          </CustomText>
        </Box>

        {/* Product catalogue */}
        <Box
          id="product-catalogue"
          sx={{
            border: `2px solid ${BORDER_COLOR}`,
            borderRadius: 1,
            overflow: "hidden",
            mb: 5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              borderBottom: `1px solid ${BORDER_COLOR}`,
              bgcolor: "#fff",
            }}
          >
            {B2B_CATEGORIES.map((label, index) => (
              <Box
                key={label}
                onClick={() => setActiveTab(index)}
                sx={{
                  px: 2,
                  py: 1.5,
                  cursor: "pointer",
                  backgroundColor: activeTab === index ? ACTIVE_TAB_BG : "transparent",
                  color: activeTab === index ? "#fff" : "#2c2c2c",
                  fontWeight: 600,
                  fontSize: { xs: 11, sm: 12 },
                  textTransform: "uppercase",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {label}
              </Box>
            ))}
          </Box>
          <Box sx={{ p: 2, display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "flex-start" }}>
            {filteredProducts.map((item) => (
              <Box
                key={item.id}
                sx={{
                  width: { xs: "calc(50% - 8px)", sm: "calc(33.333% - 11px)", md: "calc(25% - 12px)" },
                  borderRadius: 1,
                  overflow: "hidden",
                  bgcolor: "#f5f5f5",
                  border: "1px solid #eee",
                  position: "relative",
                }}
              >
                <Box sx={{ aspectRatio: "1", position: "relative", bgcolor: "#f0f0f0" }}>
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.name}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  {item.veg && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        bgcolor: "rgba(27, 156, 63, 0.95)",
                        border: "1px solid #fff",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                      }}
                    />
                  )}
                </Box>
                <Box sx={{ p: 1.5, textAlign: "center" }}>
                  <CustomText
                    sx={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#2c2c2c",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {item.name}
                  </CustomText>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* B2B Product Estimation */}
        <CustomText
          component="h2"
          sx={{
            fontSize: { xs: 22, sm: 26, md: 28 },
            fontWeight: 700,
            color: "#2c2c2c",
            fontFamily: "'Inter', sans-serif",
            mb: 2,
          }}
        >
          B2B Product Estimation
        </CustomText>
        <Box
          sx={{
            bgcolor: BANNER_BG,
            border: `1px solid ${BORDER_COLOR}`,
            borderRadius: 1,
            px: 2,
            py: 1.5,
            mb: 3,
          }}
        >
          <CustomText
            sx={{
              fontSize: { xs: 13, sm: 14 },
              color: "#555",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Please fill the form below and submit your request, we will call you back for more discussion. You have to put discounts as per your choice. Discount depends upon the quantity ordered.
          </CustomText>
        </Box>

        <Box
          id="request-form"
          component="form"
          onSubmit={handleSubmit}
          sx={{
            border: `2px solid ${BORDER_COLOR}`,
            borderRadius: 1,
            bgcolor: "#fff",
            p: { xs: 2, md: 3 },
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
            <Box>
              <CustomText sx={{ fontSize: 14, fontWeight: 600, color: "#2c2c2c", mb: 0.5, display: "block" }}>
                Your Name
              </CustomText>
              <TextField
                fullWidth
                size="small"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Your Name"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1 } }}
              />
            </Box>
            <Box>
              <CustomText sx={{ fontSize: 14, fontWeight: 600, color: "#2c2c2c", mb: 0.5, display: "block" }}>
                Mobile Number
              </CustomText>
              <TextField
                fullWidth
                size="small"
                value={form.mobile}
                onChange={(e) => setForm((f) => ({ ...f, mobile: e.target.value }))}
                placeholder="Mobile Number"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1 } }}
              />
            </Box>
            <Box>
              <CustomText sx={{ fontSize: 14, fontWeight: 600, color: "#2c2c2c", mb: 0.5, display: "block" }}>
                Your Email
              </CustomText>
              <TextField
                fullWidth
                size="small"
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="Your Email"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1 } }}
              />
            </Box>
          </Box>

          <CustomText
            sx={{
              fontSize: 18,
              fontWeight: 700,
              color: "#2c2c2c",
              fontFamily: "'Inter', sans-serif",
              textAlign: "center",
              mb: 2,
            }}
          >
            Danbro Fresh Product Menu
          </CustomText>

          <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #e0e0e0", borderRadius: 1, overflow: "auto" }}>
            <Table size="small" sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow sx={{ bgcolor: "#1565c0", "& th": { color: "#fff", fontWeight: 700, fontSize: 12, textTransform: "uppercase", py: 1.2 } }}>
                  <TableCell>Product</TableCell>
                  <TableCell>Unit</TableCell>
                  <TableCell>MRP</TableCell>
                  <TableCell>GST</TableCell>
                  <TableCell>Base Price</TableCell>
                  <TableCell>Taxes</TableCell>
                  <TableCell>Min Order Qty</TableCell>
                  <TableCell>Required Qty</TableCell>
                  <TableCell>Discount (%)</TableCell>
                  <TableCell>Line Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {menuRows.map((row, index) => (
                  <TableRow key={row.id} sx={{ "&:not(:last-child) td": { borderBottom: "1px solid #eee" } }}>
                    <TableCell sx={{ fontSize: 13 }}>{row.product}</TableCell>
                    <TableCell sx={{ fontSize: 13 }}>{row.unit}</TableCell>
                    <TableCell sx={{ fontSize: 13 }}>{row.mrp}</TableCell>
                    <TableCell sx={{ fontSize: 13 }}>{row.gst}%</TableCell>
                    <TableCell sx={{ fontSize: 13 }}>{row.basePrice?.toFixed(2)}</TableCell>
                    <TableCell sx={{ fontSize: 13 }}>{row.taxes?.toFixed(2)}</TableCell>
                    <TableCell sx={{ fontSize: 13 }}>{row.minOrderQty}</TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        type="number"
                        value={row.requiredQty}
                        onChange={(e) => updateRow(index, "requiredQty", e.target.value)}
                        sx={{ width: 80, "& .MuiOutlinedInput-root": { borderRadius: 1 } }}
                        inputProps={{ min: 0 }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        type="number"
                        value={row.discount}
                        onChange={(e) => updateRow(index, "discount", e.target.value)}
                        sx={{ width: 80, "& .MuiOutlinedInput-root": { borderRadius: 1 } }}
                        inputProps={{ min: 0, max: 100 }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontSize: 13, fontWeight: 600 }}>{row.lineTotal?.toFixed(2) ?? "0.00"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: "var(--themeColor)",
              color: "#fff",
              fontWeight: 600,
              textTransform: "none",
              px: 4,
              py: 1.2,
              "&:hover": { backgroundColor: "#b71c1c" },
            }}
          >
            Submit Request
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
