const CHUNK_PUBLIC_PATH = "server/pages/products.js";
const runtime = require("../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/[root of the server]__13070e._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_next_0bd02f._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_@mui_material_bce1f0._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_@mui_system_esm_de1b6a._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_7e7f2b._.js");
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/pages.js { INNER_PAGE => \"[project]/src/pages/products/index.tsx [ssr] (ecmascript)\", INNER_DOCUMENT => \"[project]/node_modules/next/document.js [ssr] (ecmascript)\", INNER_APP => \"[project]/src/pages/_app.tsx [ssr] (ecmascript)\" } [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
