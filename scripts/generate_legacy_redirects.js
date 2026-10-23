const fs = require('fs');
const path = require('path');

const gemstones = require('../src/data/gemstones.json');

const publicDir = path.join(__dirname, '../public');

function createRedirectHtml(destPath) {
  const fullDest = `https://www.noblecutgems.com${destPath}`;
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <title>NobleCutGems - Weiterleitung</title>
  <meta http-equiv="refresh" content="0; url=${destPath}">
  <link rel="canonical" href="${fullDest}">
  <meta name="robots" content="noindex, follow">
</head>
<body>
  <p>Weiterleitung zu <a href="${destPath}">${fullDest}</a>...</p>
  <script>window.location.replace("${destPath}");</script>
</body>
</html>
`;
}

function writeRedirect(routePath, destPath) {
  const cleanRoute = routePath.replace(/^\/+|\/+$/g, '');
  const htmlContent = createRedirectHtml(destPath);

  // 1. Write route.html
  const flatFilePath = path.join(publicDir, `${cleanRoute}.html`);
  fs.mkdirSync(path.dirname(flatFilePath), { recursive: true });
  fs.writeFileSync(flatFilePath, htmlContent, 'utf8');

  // 2. Write route/index.html
  const nestedDirPath = path.join(publicDir, cleanRoute);
  fs.mkdirSync(nestedDirPath, { recursive: true });
  fs.writeFileSync(path.join(nestedDirPath, 'index.html'), htmlContent, 'utf8');
}

// 1. Static base pages
const staticRedirects = [
  { from: 'home', to: '/de' },
  { from: 'Home', to: '/de' },
  { from: 'agb', to: '/de/agb' },
  { from: 'AGB', to: '/de/agb' },
  { from: 'contact', to: '/de/contact' },
  { from: 'Contact', to: '/de/contact' },
  { from: 'about', to: '/de/about' },
  { from: 'About', to: '/de/about' },
  { from: 'collection', to: '/de/collection' },
  { from: 'Collection', to: '/de/collection' },
  { from: 'edelsteine', to: '/de/collection' },
  { from: 'privacy', to: '/de/privacy' },
  { from: 'datenschutz', to: '/de/privacy' },
  { from: 'Datenschutz', to: '/de/privacy' },
  { from: 'imprint', to: '/de/imprint' },
  { from: 'impressum', to: '/de/imprint' },
  { from: 'Impressum', to: '/de/imprint' },
  { from: 'wishlist', to: '/de/wishlist' },
  { from: 'Wishlist', to: '/de/wishlist' },
];

let count = 0;

staticRedirects.forEach(({ from, to }) => {
  writeRedirect(from, to);
  count++;
});

// 2. Stone redirects (/stone/[slug] and /edelsteine/[slug])
gemstones.forEach((stone) => {
  if (stone.slug) {
    const dest = `/de/stone/${stone.slug}`;
    writeRedirect(`stone/${stone.slug}`, dest);
    writeRedirect(`edelsteine/${stone.slug}`, dest);
    count += 2;
  }
});

console.log(`Successfully generated legacy redirect files for ${count} route targets in public/`);

