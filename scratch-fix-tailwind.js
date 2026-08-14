const fs = require('fs');

const files = ['index.html','about.html','anodising.html','contact.html','cyanide-copper.html',
  'electroplating.html','enquiry.html','gallery.html','galvanising.html','services.html','zinc-nickel.html'];

for (const f of files) {
  let c = fs.readFileSync(f, 'utf8');
  const before = c;

  // Remove all cdn.tailwindcss.com script tags (with or without query params)
  c = c.replace(/[ \t]*<script src="https:\/\/cdn\.tailwindcss\.com[^"]*"><\/script>\n?/g, '');

  // Remove inline tailwind.config script blocks (both plain <script> and <script id="tailwind-config">)
  c = c.replace(/[ \t]*<script(?: id="tailwind-config")?>\s*\n\s*tailwind\.config\s*=\s*\{[\s\S]*?\n\s*\}\s*\n\s*<\/script>\n?/g, '');

  // Insert compiled stylesheet link right before </head>
  if (!c.includes('assets/css/tailwind.css')) {
    c = c.replace('</head>', '    <link rel="stylesheet" href="assets/css/tailwind.css">\n</head>');
  }

  if (c !== before) {
    fs.writeFileSync(f, c);
    console.log('updated', f);
  } else {
    console.log('NO CHANGE', f);
  }
}
