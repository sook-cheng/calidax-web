
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
      "path": "chunk-4U54HWQ5.js",
      "dynamicImport": false
    }
  ],
  "src/app/routes/protected-routes.module.ts": [
    {
      "path": "chunk-XWVI3I6I.js",
      "dynamicImport": false
    }
  ]
},
  assets: {
    'index.csr.html': {size: 7151, hash: '4bc5e83a6595fe25cf7a3cbe13429a1c5ee8720715a46f846d7734497f86b9f7', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1950, hash: '6dcdc3b433d50c8f2cb07a4122e97c1d8e5beba2dd4c4b4db803c69023552875', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-O4RCTHNB.css': {size: 320196, hash: 'qD00AjDT9B8', text: () => import('./assets-chunks/styles-O4RCTHNB_css.mjs').then(m => m.default)}
  },
};
