// src/pages/ShortenerPage.jsx
import React, { useState, useEffect } from "react";
import { Box, Grid, TextField, Button, Typography, Paper, Alert } from "@mui/material";
import { storageService } from "../services/storageService";
import { isValidUrl, validateShortcode } from "../utils/urlUtils";
import { Log } from "@logger/logger";
import Navbar from "./Navbar";

import Footer from './footer';


const DOMAIN = "pragatiurlshortner.com";
const BACKGROUND_URL =
  "https://t4.ftcdn.net/jpg/01/31/15/51/360_F_131155172_4ZVdaT7YF5yJHqircjy59DDxV6aWFds9.jpg";

export default function ShortenerPage() {
  const [rows, setRows] = useState([{ longUrl: "", validity: "", shortcode: "" }]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    Log("frontend", "info", "page", "ShortenerPage loaded");
  }, []);

  const addRow = () => {
    if (rows.length >= 5) {
      setError("Maximum 5 URLs allowed");
      Log("frontend", "warn", "page", "User tried to add more than 5 URLs");
      return;
    }
    setRows([...rows, { longUrl: "", validity: "", shortcode: "" }]);
  };

  const updateRow = (idx, key, value) => {
    const copy = [...rows];
    copy[idx][key] = value;
    setRows(copy);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    const created = [];
    try {
      for (let i = 0; i < rows.length; i++) {
        const { longUrl, validity, shortcode } = rows[i];
        if (!isValidUrl(longUrl)) throw new Error(`Row ${i + 1}: Invalid URL`);
        const validityInt = validity ? parseInt(validity) : 30;
        if (isNaN(validityInt) || validityInt <= 0)
          throw new Error(`Row ${i + 1}: Validity must be positive integer`);
        if (shortcode && !validateShortcode(shortcode))
          throw new Error(`Row ${i + 1}: Shortcode invalid`);

        const linkObj = storageService.createShortLink({
          longUrl,
          validityMinutes: validityInt,
          preferredShortcode: shortcode || null,
        });
        created.push(linkObj);
      }
      setResults(created);
      setRows([{ longUrl: "", validity: "", shortcode: "" }]);
      Log("frontend", "info", "page", `Created ${created.length} short URLs`);
    } catch (err) {
      setError(err.message);
      Log("frontend", "error", "page", `Error creating URLs: ${err.message}`);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flex: 1,
          overflowY: "auto",
          mt: 3,
          pb: 4,
          backgroundImage: `url(${BACKGROUND_URL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          fontFamily: "'Poppins', sans-serif",
          p: 3,
          "&::-webkit-scrollbar": { width: "8px" },
          "&::-webkit-scrollbar-track": { background: "rgba(0,0,0,0.05)", borderRadius: "4px" },
          "&::-webkit-scrollbar-thumb": { backgroundColor: "#4f46e5", borderRadius: "4px" },
          "&::-webkit-scrollbar-thumb:hover": { backgroundColor: "#3730a3" },
        }}
      >
        <Paper
          sx={{
            p: 4,
            maxWidth: 600,
            width: "100%",
            borderRadius: 4,
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            border: "1px solid rgba(0,0,0,0.05)",
            backgroundColor: "rgba(255,255,255,0.95)",
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: "bold" }}>
            Shorten a long URL
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            {rows.map((r, idx) => (
              <Box key={idx} sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Enter long link here"
                  variant="outlined"
                  value={r.longUrl}
                  onChange={(e) => updateRow(idx, "longUrl", e.target.value)}
                  sx={{ mb: 1 }}
                />
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Customize your link (optional)
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      value={DOMAIN}
                      disabled
                      InputProps={{ style: { color: "#555", fontWeight: 500 } }}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      fullWidth
                      placeholder="Enter alias"
                      value={r.shortcode}
                      onChange={(e) => updateRow(idx, "shortcode", e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Box>
            ))}

            <Button variant="contained" color="success" fullWidth sx={{ mt: 2 }} type="submit">
              Shorten URL
            </Button>
            <Button variant="outlined" fullWidth sx={{ mt: 1 }} onClick={addRow}>
              Add another URL
            </Button>
          </form>

          {/* Results */}
          {results.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Created Links
              </Typography>
              {results.map((r) => (
                <Paper key={r.shortcode} sx={{ p: 2, my: 1, backgroundColor: "rgba(0,0,0,0.05)" }}>
                  <Typography>
                    <strong>Short URL:</strong>{" "}
                    <a href={`https://${DOMAIN}/${r.shortcode}`} target="_blank" rel="noopener noreferrer">
                      {DOMAIN}/{r.shortcode}
                    </a>
                  </Typography>
                  <Typography>
                    <strong>Original:</strong> {r.longUrl}
                  </Typography>
                  <Typography>
                    <strong>Expires at:</strong> {new Date(r.expiresAt).toLocaleString()}
                  </Typography>
                </Paper>
              ))}
            </Box>
          )}
        </Paper>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
}
