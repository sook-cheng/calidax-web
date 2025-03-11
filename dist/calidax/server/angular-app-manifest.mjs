
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
      "path": "chunk-HVNBVVPO.js",
      "dynamicImport": false
    }
  ],
  "src/app/routes/protected-routes.module.ts": [
    {
      "path": "chunk-DE6K7GOF.js",
      "dynamicImport": false
    }
  ]
},
  assets: {
    'index.csr.html': {size: 7139, hash: '296a82d281fbe463c26bc2166c291fca416469af4ff1bd3e4321c4366ba7bd8d', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1938, hash: '5ce998d82eed3a4156ad904ca4bb67a7479c3684bada854efec2a19ea0ff00e4', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-Z7V6XC73.css': {size: 320025, hash: 'iH87KNheI+g', text: () => import('./assets-chunks/styles-Z7V6XC73_css.mjs').then(m => m.default)}
  },
};
