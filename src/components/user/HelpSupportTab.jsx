import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { CustomText } from "../comman/CustomText";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { createHelpTicket, getAllHelpRequests } from "../../utils/apiService";

export const HelpSupportTab = () => {
  const [orderId, setOrderId] = useState("");
  const [subject, setSubject] = useState("");
  const [query, setQuery] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [helpList, setHelpList] = useState([]);
  const [helpListLoading, setHelpListLoading] = useState(false);

  const fetchHelpList = async () => {
    setHelpListLoading(true);
    try {
      const data = await getAllHelpRequests();
      setHelpList(Array.isArray(data) ? data : []);
    } catch (err) {
      setHelpList([]);
    } finally {
      setHelpListLoading(false);
    }
  };

  useEffect(() => {
    fetchHelpList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");
    if (!subject.trim() || !query.trim()) {
      setSubmitError("Subject and query are required.");
      return;
    }
    setSubmitLoading(true);
    try {
      await createHelpTicket({
        orderId: orderId.trim(),
        subject: subject.trim(),
        query: query.trim(),
        images: imageFiles,
      });
      setSubmitSuccess("Help ticket submitted successfully.");
      setOrderId("");
      setSubject("");
      setQuery("");
      setImageFiles([]);
      fetchHelpList();
    } catch (err) {
      setSubmitError(err.response?.data?.message || err.message || "Failed to submit ticket.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setImageFiles(files);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <SupportAgentIcon sx={{ fontSize: { xs: 32, md: 40 }, color: "var(--themeColor)" }} />
        <CustomText
          variant="h4"
          sx={{
            fontSize: { xs: 24, md: 32 },
            fontWeight: 700,
            color: "var(--themeColor)",
          }}
        >
          Help &amp; Support
        </CustomText>
      </Box>

      <CustomText sx={{ fontSize: { xs: 14, md: 15 }, color: "#555", mb: 2 }}>
        For any help related to your orders, payments, refunds, or account, please reach out to us:
      </CustomText>

      {/* Create help ticket form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 2,
          p: 2,
          borderRadius: 2,
          bgcolor: "#fafafa",
          border: "1px solid #eee",
          mb: 3,
        }}
      >
        <CustomText sx={{ fontSize: 16, fontWeight: 600, mb: 2, color: "var(--themeColor)" }}>
          Create help ticket
        </CustomText>
        <TextField
          fullWidth
          size="small"
          label="Order ID (optional)"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          size="small"
          label="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          size="small"
          label="Query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          size="small"
          type="file"
          inputProps={{ accept: "image/*", multiple: true }}
          onChange={handleFileChange}
          sx={{ mb: 2 }}
        />
        {submitError && (
          <Typography color="error" sx={{ fontSize: 13, mb: 1 }}>
            {submitError}
          </Typography>
        )}
        {submitSuccess && (
          <Typography sx={{ fontSize: 13, mb: 1, color: "success.main" }}>
            {submitSuccess}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          disabled={submitLoading}
          sx={{
            bgcolor: "var(--themeColor)",
            "&:hover": { bgcolor: "var(--themeColor)", opacity: 0.9 },
          }}
        >
          {submitLoading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
        </Button>
      </Box>

      {/* Help requests list */}
      <Box sx={{ mt: 3 }}>
        <CustomText sx={{ fontSize: 16, fontWeight: 600, mb: 2, color: "var(--themeColor)" }}>
          Help requests
        </CustomText>
        {helpListLoading ? (
          <Box sx={{ py: 2, display: "flex", justifyContent: "center" }}>
            <CircularProgress size={32} sx={{ color: "var(--themeColor)" }} />
          </Box>
        ) : helpList.length === 0 ? (
          <CustomText sx={{ fontSize: 14, color: "#666" }}>No help requests yet.</CustomText>
        ) : (
          <List sx={{ bgcolor: "#fafafa", borderRadius: 2, border: "1px solid #eee" }}>
            {helpList.map((item, index) => (
              <ListItem key={item._id || item.id || index} divider={index < helpList.length - 1}>
                <ListItemText
                  primary={item.subject ?? item.query ?? "—"}
                  secondary={
                    <>
                    {item.query && item.subject && (
                      <Typography component="span" variant="body2" color="text.secondary">
                        {item.query}
                      </Typography>
                    )}
                    {item.orderId && (
                      <Typography component="span" variant="body2" display="block" color="text.secondary">
                        Order: {item.orderId}
                      </Typography>
                    )}
                    {item.createdAt && (
                      <Typography component="span" variant="body2" display="block" color="text.secondary">
                        {new Date(item.createdAt).toLocaleString()}
                      </Typography>
                    )}
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      <Box sx={{ mt: 3, p: 2, borderRadius: 2, bgcolor: "#FFF8F2", border: "1px solid #FFDFBF" }}>
        <CustomText sx={{ fontSize: { xs: 13, md: 14 }, fontWeight: 600, mb: 0.5 }}>
          Customer Support
        </CustomText>
        <CustomText sx={{ fontSize: { xs: 12, md: 13 }, color: "#666" }}>
          Email: info@mrbrownbakery.com
        </CustomText>
        <CustomText sx={{ fontSize: { xs: 12, md: 13 }, color: "#666" }}>
          Phone: +91-7309032618
        </CustomText>
        <CustomText sx={{ fontSize: { xs: 12, md: 13 }, color: "#666", mt: 1 }}>
          Our team is available to assist you with order status, cancellations, returns, and other queries.
        </CustomText>
      </Box>
    </Box>
  );
};
