
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
      "path": "chunk-Y23BSD2G.js",
      "dynamicImport": false
    }
  ],
  "src/app/routes/protected-routes.module.ts": [
    {
      "path": "chunk-ZPVJDBXI.js",
      "dynamicImport": false
    }
  ]
},
  assets: {
    'index.csr.html': {size: 7100, hash: 'f3c4b30ee4f97493775f45443d4c8ac6a3f0639d2406441f18cfdfe818bf0c0c', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1899, hash: 'd2e5335fb35f0764bfdd14be4f9a4ec24fecbfd411c82e8b9b90aea80b62ffe6', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-FHXLY76G.css': {size: 320263, hash: 'sI2QhS1FrTU', text: () => import('./assets-chunks/styles-FHXLY76G_css.mjs').then(m => m.default)}
  },
};
