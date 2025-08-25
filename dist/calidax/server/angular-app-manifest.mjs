
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
      "path": "chunk-ZF44AGOA.js",
      "dynamicImport": false
    }
  ],
  "src/app/routes/protected-routes.module.ts": [
    {
      "path": "chunk-57NWNUWG.js",
      "dynamicImport": false
    }
  ]
},
  assets: {
    'index.csr.html': {size: 7100, hash: 'bb522d9337b57d80eaac61bd6ea4a27a836ffbbdba15cfbb6999a0ee50425482', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1899, hash: 'cf15de22b45074521bccbb03870408b2b2fe8211f381d9b5e259fba065d2ba78', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-O4RCTHNB.css': {size: 320196, hash: 'qD00AjDT9B8', text: () => import('./assets-chunks/styles-O4RCTHNB_css.mjs').then(m => m.default)}
  },
};
