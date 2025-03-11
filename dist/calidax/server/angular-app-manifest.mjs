
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
      "path": "chunk-RAH3OH2B.js",
      "dynamicImport": false
    }
  ],
  "src/app/routes/protected-routes.module.ts": [
    {
      "path": "chunk-R6NUDTNN.js",
      "dynamicImport": false
    }
  ]
},
  assets: {
    'index.csr.html': {size: 7139, hash: '95aa0366c48551a42416a07e28dfa16ac48ee4b7ce682eb94c8d67801a3cb4b0', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1938, hash: '153a549bda6bbf665a6df7bf3e8ecb0dbe0efaa9235afacbd37fa8b82cb5c4ea', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-Z7V6XC73.css': {size: 320025, hash: 'iH87KNheI+g', text: () => import('./assets-chunks/styles-Z7V6XC73_css.mjs').then(m => m.default)}
  },
};
