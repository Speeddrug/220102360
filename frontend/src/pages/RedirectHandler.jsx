import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { Log } from '@logger/logger';

export default function RedirectHandler() {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const link = storageService.getLink(shortcode);

    if (!link) {
      Log("frontend", "warn", "page", `Shortcode not found: ${shortcode}`);
      navigate("/"); // redirect to home if invalid
      return;
    }

    const now = new Date();
    if (new Date(link.expiresAt) < now) {
      Log("frontend", "warn", "page", `Shortcode expired: ${shortcode}`);
      alert("This short URL has expired.");
      navigate("/");
      return;
    }

    // Record click
    storageService.recordClick(shortcode, {
      timestamp: now.toISOString(),
      referrer: document.referrer || 'Direct',
      location: navigator.language || 'Unknown'
    });

    Log("frontend", "info", "page", `Redirecting shortcode ${shortcode} -> ${link.longUrl}`);

    // Perform redirect
    window.location.href = link.longUrl;
  }, [shortcode, navigate]);

  return <p>Redirecting...</p>;
}
