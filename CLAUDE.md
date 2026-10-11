# siddharthshah.me — CLAUDE.md

Personal card, bigsidd identity. Static page in `public/`, deployed to Render (not Vercel) via `render.yaml`.

- Keep it a card: name, a one-line lede, one short paragraph of proof, the hello@ address, links. No selling; Upward Ventures gets one link.
- Never name the current employer.
- Shares fonts and palette with upwardvx.com (Bricolage Grotesque, IBM Plex; sand, forest, terracotta) but stays quieter: one entrance on load and the postmark (Los Angeles + live local time; tap for your own time and the gap to LA), followed by Long Beach weather from our own Worker (`worker/weather.js`, one first-party fetch, hidden on any failure) and a "golden hour" note in the hour before sunset. No scroll, cursor or idle effects. Small progressive JS only; the card must read fully without it.
- hello@siddharthshah.me forwards to iCloud and Gmail via Cloudflare Email Routing and the `hello-forward` Email Worker (`worker/hello-forward.js`).
- No location finer than Long Beach city level, and never live or travel location.
- Verify in a real browser at 375px and 1280px before calling a change done.
