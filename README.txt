Undetected Playwright Music Scraper

# Description
A Python bot script based on the Playwright framework that reliably bypasses anti-bot protections and collects song metadata from the Muzmo website. The script simulates human-like behavior (random scrolling and delays) and saves the extracted data to a CSV file.

# Features
- Playwright-based scraping**: Uses Playwright as the primary scraping tool; the rest of the code is custom-developed.
- Anti-detection script: A JavaScript injection that masks fingerprints and helps bypass advanced anti-bot protections.
- Human behavior simulation**: Randomized scrolling, mouse movements, and pauses to reduce the risk of being blocked.
- CSV export**: Extracted fields (title, link, duration, bitrate) are saved to `data_songs.csv` for further processing.

# Technologies
- Python 3.10+
- Playwright
- JavaScript (anti-detection script)

# Usage
1. Install dependencies:
```bash
pip install playwright
playwright install

# Output
- data_songs.csv

# Disclaimer
This project is developed solely for demonstration and research purposes.
It is not intended for commercial use, large-scale data collection, or bypassing website restrictions.
Use it only where permitted by the platform's rules.