
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {
  "node_modules/html2canvas/dist/html2canvas.js": [
    {
      "path": "chunk-SWBZ2T66.js",
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
      "path": "chunk-P23GFKFC.js",
      "dynamicImport": false
    }
  ],
  "src/app/routes/protected-routes.module.ts": [
    {
      "path": "chunk-HQU7NHBB.js",
      "dynamicImport": false
    }
  ]
},
  assets: {
    'index.csr.html': {size: 7100, hash: '2e6daedf3d8fba1a9e8922f8d846a73f6a0e165c92f2db38ae1d1c9374634fe9', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1899, hash: '35d4584fd9e85b7b0f981161efd19dd1a1d6ace2246e4f4f36839c0209377440', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-O4RCTHNB.css': {size: 320196, hash: 'qD00AjDT9B8', text: () => import('./assets-chunks/styles-O4RCTHNB_css.mjs').then(m => m.default)}
  },
};
