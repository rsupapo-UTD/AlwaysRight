const CHUNK_PUBLIC_PATH = "server/pages/orders.js";
const runtime = require("../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/[root of the server]__a7bdf4._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_next_e87ff1._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_@mui_material_170787._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_@mui_system_esm_4b1b99._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_fa1e82._.js");
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/pages.js { INNER_PAGE => \"[project]/src/pages/orders/index.tsx [ssr] (ecmascript)\", INNER_DOCUMENT => \"[project]/node_modules/next/document.js [ssr] (ecmascript)\", INNER_APP => \"[project]/src/pages/_app.tsx [ssr] (ecmascript)\" } [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
