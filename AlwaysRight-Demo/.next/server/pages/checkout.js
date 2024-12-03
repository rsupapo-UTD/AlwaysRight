const CHUNK_PUBLIC_PATH = "server/pages/checkout.js";
const runtime = require("../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/node_modules_next_32ab3c._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_@mui_system_esm_e5db2e._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_@mui_material_18185c._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_9deb2a._.js");
runtime.loadChunk("server/chunks/ssr/[root of the server]__14c57c._.js");
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/pages.js { INNER_PAGE => \"[project]/src/pages/checkout.tsx [ssr] (ecmascript)\", INNER_DOCUMENT => \"[project]/node_modules/next/document.js [ssr] (ecmascript)\", INNER_APP => \"[project]/src/pages/_app.tsx [ssr] (ecmascript)\" } [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
