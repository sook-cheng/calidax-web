
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
      "path": "chunk-VZBN2H2T.js",
      "dynamicImport": false
    }
  ],
  "src/app/routes/protected-routes.module.ts": [
    {
      "path": "chunk-EI2CBMKO.js",
      "dynamicImport": false
    }
  ]
},
  assets: {
    'index.csr.html': {size: 7100, hash: '50edff96bdf29ff94d1a043e3bd8403d8896413164e18ff3501f90c1f230c218', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1899, hash: 'e897dbad079a779fd190fd5b80f8970410e124c45e3fca9202ed7dd6aeda4a52', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-O4RCTHNB.css': {size: 320196, hash: 'qD00AjDT9B8', text: () => import('./assets-chunks/styles-O4RCTHNB_css.mjs').then(m => m.default)}
  },
};
