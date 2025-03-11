
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
    'index.csr.html': {size: 7138, hash: '487ef1263e7471df835cc9d476e8d72f6785fa35512c9c9e0bd355658b8e06c6', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1938, hash: '3618a9a79638aa5d7b041bf4efca8a947ffc5f89555a09bc8dd68140a3883343', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-WKY7RGQA.css': {size: 320015, hash: 'XVZ7rvNWJXc', text: () => import('./assets-chunks/styles-WKY7RGQA_css.mjs').then(m => m.default)}
  },
};
