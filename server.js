const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3456;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Proxy endpoint — avoids CORS in browser
app.get('/api/records', async (req, res) => {
  const { token, base, table, offset } = req.query;
  if (!token || !base || !table) {
    return res.status(400).json({ error: 'Missing token, base, or table' });
  }

  let url = `https://api.airtable.com/v0/${base}/${encodeURIComponent(table)}?pageSize=100&cellFormat=string&timeZone=UTC&userLocale=en-us`;
  if (offset) url += `&offset=${offset}`;

  try {
    const r = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await r.json();
    if (!r.ok) return res.status(r.status).json(data);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`\n✅  Airtable Project Board running at:\n`);
  console.log(`   → http://localhost:${PORT}\n`);
  console.log(`   Press Ctrl+C to stop.\n`);
});
