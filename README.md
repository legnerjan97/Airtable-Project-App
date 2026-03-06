# Airtable Project Board

A lightweight web app that displays your Airtable project records as visual cards in the browser. Cards update automatically every 10 seconds — any record you add or edit in Airtable will appear shortly without a manual refresh.

---

## Features

- 📋 **Card view** — each Airtable record displayed as a card with all key fields
- 🎨 **Colour-coded status badges** — Done (green), In Progress (blue), Blocked (red), Not Started (grey)
- 🔍 **Status filters** — filter chips built dynamically from your actual data
- 🔄 **Auto-refresh** — syncs with Airtable every 10 seconds
- 📄 **Pagination** — handles tables with more than 100 records automatically

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- An Airtable account with a Projects table

---

## Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/legnerjan97/Airtable-Project-App.git
cd Airtable-Project-App
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the server
```bash
node server.js
```

You should see:
```
✅  Airtable Project Board running at:

   → http://localhost:3456

   Press Ctrl+C to stop.
```

### 4. Open the app

Open **http://localhost:3456** in your browser.

---

## Configuration

On first load, a configuration dialog will appear. Fill in:

| Field | Description | Example |
|---|---|---|
| **Personal Access Token** | Your Airtable PAT. Generate at [airtable.com/create/tokens](https://airtable.com/create/tokens) with `data.records:read` scope | `patXXXXXXXXXXXXXX.XXXX…` |
| **Base ID** | Found in your base URL: `airtable.com/`**`appXXXX`**`/tbl…` | `appdxfkg74EeaIjBD` |
| **Table Name or ID** | Exact table name as shown in Airtable, or the table ID starting with `tbl…` | `Projects` or `tbl8I8LDTE5UTfj85` |

> **Security note:** Your credentials are stored only in browser memory for the current session. They are never written to disk or sent to any external server.

---

## Expected Table Structure

The app reads the following fields from your Airtable table (field names must match exactly):

| Airtable Field | Displayed As |
|---|---|
| `Project Name` | Card title |
| `Project Status` | Colour-coded badge + filter chips |
| `Start Date` | Metadata row |
| `End Date` | Metadata row |
| `Assignee` | Metadata row |
| `Reporter` | Metadata row |
| `Team Assigned` | Metadata row (pill tag) |

---

## Why a local proxy server?

Browsers enforce **CORS policy**, which blocks JavaScript from calling `api.airtable.com` directly when a page is opened from a local file. The included `server.js` runs a small Node.js/Express server that:

1. Serves `index.html` at `http://localhost:3456`
2. Forwards API requests to Airtable at `/api/records`
3. Returns the results to the browser — no CORS issues

Your Airtable token travels only between your machine and Airtable's servers.

---

## Project Structure
```
├── server.js          # Local Express proxy server
├── index.html         # Frontend — card grid, filters, config overlay
├── package.json       # Node.js dependencies (express, cors)
├── package-lock.json  # Locked dependency versions
└── README.md          # This file
```

---

## Stopping the server

Press `Ctrl+C` in the terminal where `node server.js` is running.
