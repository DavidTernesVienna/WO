# Lean Interval Timer PWA

This project wraps the existing Lean Interval Timer into a Progressive Web App.

## Build & Run

```bash
npm install
npm run build
npm start
```

`npm start` serves the built files from the `dist` folder on http://localhost:3000.

## Deploy

* GitHub Pages Quelle: `main` → `/docs`
* Lokaler Test: `npm start` (http://localhost:3000)
* Online-URL: `https://USERNAME.github.io/WO/`

## Known limitations

* The service worker caches only the core assets. Any external resources such as YouTube music streams require network access.
* File loading for custom cycles uses the browser file picker and is not cached.
* No local icon assets are bundled because binary uploads are unsupported.

## Features retained

* Timer start/pause/next logic.
* Loading workout cycles from local files.
* Progress persistence via Local Storage.
* YouTube music presets and custom URL support.
* Keyboard shortcuts for control.

## Minimal changes

* Added Web App Manifest (icons omitted).
* Added service worker for offline caching of core assets.
* Registered service worker in `index.html`.
