# siddharthshah.me — CLAUDE.md

Personal card, bigsidd identity. Static page in `public/`, deployed to Render (not Vercel) via `render.yaml`.

- Keep it a card: name, a one-line lede, one short paragraph of proof, the hello@ address, links. No selling; Upward Ventures gets one link.
- Never name the current employer.
- Shares fonts and palette with upwardvx.com (Bricolage Grotesque, IBM Plex; sand, forest, terracotta) but stays quieter: one entrance on load and the postmark (Los Angeles + live local time; tap for your own time and the gap to LA), which re-presses once when the LA minute changes while the tab is visible. While the weather fetch from our own Worker (`worker/weather.js`) is still pending 250ms after the postmark lands, a small double-ring chip with three inking dots holds its place; on success the Long Beach weather presses in, on any failure the chip closes and nothing shows (only the golden-hour note, if it is that hour). In the hour before sunset, an 18px sun-in-the-ring glyph sits before "golden hour", one step a minute. The favicon is an LA-hour clock (day / golden / night), redrawn on the minute. No scroll, cursor or other idle effects. Small progressive JS only; the card must read fully without it.
- hello@siddharthshah.me forwards to iCloud and Gmail via Cloudflare Email Routing and the `hello-forward` Email Worker (`worker/hello-forward.js`).
- No location finer than Long Beach city level, and never live or travel location.
- Verify in a real browser at 375px and 1280px before calling a change done.
