
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {
  "node_modules/html2canvas/dist/html2canvas.js": [
    {
      "path": "chunk-PM3QAI3C.js",
      "dynamicImport": false
    }
  ],
  "node_modules/dompurify/dist/purify.es.mjs": [
    {
      "path": "chunk-X4CKOTYT.js",
      "dynamicImport": false
    }
  ],
  "node_modules/canvg/lib/index.es.js": [
    {
      "path": "chunk-73F2LHTT.js",
      "dynamicImport": false
    }
  ],
  "src/app/routes/public.routes.ts": [
    {
      "path": "chunk-NB3KLPRE.js",
      "dynamicImport": false
    }
  ],
  "src/app/routes/protected-routes.module.ts": [
    {
      "path": "chunk-KGICJ3ZN.js",
      "dynamicImport": false
    }
  ]
},
  assets: {
    'index.csr.html': {size: 7151, hash: '03ac8fde7ccc32d139a59a74f67e45a21686f9f048b789db68646085bfb317ab', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1950, hash: 'e4882f6a3b2bb029133ec860c087f38ffaca3f45aba0d3fe46574bf95ded8861', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-O4RCTHNB.css': {size: 320196, hash: 'qD00AjDT9B8', text: () => import('./assets-chunks/styles-O4RCTHNB_css.mjs').then(m => m.default)}
  },
};
