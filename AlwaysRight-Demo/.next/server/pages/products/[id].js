const CHUNK_PUBLIC_PATH = "server/pages/products/[id].js";
const runtime = require("../../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/[root of the server]__05666f._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_next_65dc2b._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_@mui_material_91aa31._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_@mui_system_esm_002f63._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_b0935d._.js");
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/pages.js { INNER_PAGE => \"[project]/src/pages/products/[id].tsx [ssr] (ecmascript)\", INNER_DOCUMENT => \"[project]/node_modules/next/document.js [ssr] (ecmascript)\", INNER_APP => \"[project]/src/pages/_app.tsx [ssr] (ecmascript)\" } [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
