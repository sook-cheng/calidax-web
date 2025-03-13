
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
      "path": "chunk-UGX6AUOJ.js",
      "dynamicImport": false
    }
  ],
  "src/app/routes/protected-routes.module.ts": [
    {
      "path": "chunk-NT4IG6MY.js",
      "dynamicImport": false
    }
  ]
},
  assets: {
    'index.csr.html': {size: 7151, hash: '7200b953fbd58ba829081d40f461a05882f15e8d81273d0902bde8360ec4eb36', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1950, hash: '4463fb01763b6bb8cb7fae85dbf7844076194f630aabd1f558f29f03df1e7d00', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-Z7V6XC73.css': {size: 320025, hash: 'iH87KNheI+g', text: () => import('./assets-chunks/styles-Z7V6XC73_css.mjs').then(m => m.default)}
  },
};
