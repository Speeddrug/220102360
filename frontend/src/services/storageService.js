import { Log } from '@logger/logger';
import { generateShortcode, isValidUrl, validateShortcode } from '../utils/urlUtils';

const LINKS_KEY = "url_shortener_links_v1";

function loadAll() { return JSON.parse(localStorage.getItem(LINKS_KEY) || '{}'); }
function saveAll(map) { localStorage.setItem(LINKS_KEY, JSON.stringify(map)); }

export const storageService = {
  getAllLinksArray() {
    return Object.values(loadAll()).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  getLink(shortcode) {
    return loadAll()[shortcode] || null;
  },

  createShortLink({ longUrl, validityMinutes = 30, preferredShortcode = null }) {
    try {
      if (!isValidUrl(longUrl)) throw new Error("Invalid URL");
      if (!Number.isInteger(validityMinutes) || validityMinutes <= 0) throw new Error("Validity must be positive integer");

      const map = loadAll();
      if (Object.keys(map).length >= 5) throw new Error("Maximum 5 URLs allowed");

      let shortcode;
      if (preferredShortcode) {
        if (!validateShortcode(preferredShortcode) || map[preferredShortcode])
          throw new Error("Shortcode invalid or already exists");
        shortcode = preferredShortcode;
      } else {
        do { shortcode = generateShortcode(6); } while (map[shortcode]);
      }

      const now = new Date();
      const expiresAt = new Date(now.getTime() + validityMinutes * 60 * 1000).toISOString();
      const linkObj = { shortcode, longUrl, createdAt: now.toISOString(), expiresAt, clicks: [] };
      map[shortcode] = linkObj;
      saveAll(map);

      Log("frontend", "info", "component", `Short URL created: ${shortcode} -> ${longUrl}`);
      return linkObj;
    } catch (err) {
      Log("frontend", "error", "component", `Failed to create short URL: ${err.message}`);
      throw err;
    }
  },

  recordClick(shortcode, clickData) {
    const map = loadAll();
    const link = map[shortcode];
    if (!link) return false;
    link.clicks.push(clickData);
    map[shortcode] = link;
    saveAll(map);
    Log("frontend", "info", "component", `Short URL clicked: ${shortcode}`);
    return true;
  }
};
