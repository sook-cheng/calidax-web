
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
      "path": "chunk-WGTD5MDQ.js",
      "dynamicImport": false
    }
  ],
  "src/app/routes/protected-routes.module.ts": [
    {
      "path": "chunk-XOSXFRNY.js",
      "dynamicImport": false
    }
  ]
},
  assets: {
    'index.csr.html': {size: 7100, hash: 'd66c18df1ec450c0f2ef06f117927226a61b3090a293df6d1aa6bb2d15674af4', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1899, hash: 'fc76029ff7995ee82b0c13d6cda81ae2c950f2d45334123d0531665b64239e80', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-FHXLY76G.css': {size: 320263, hash: 'sI2QhS1FrTU', text: () => import('./assets-chunks/styles-FHXLY76G_css.mjs').then(m => m.default)}
  },
};
