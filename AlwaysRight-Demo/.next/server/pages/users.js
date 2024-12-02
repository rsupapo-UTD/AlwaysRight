const CHUNK_PUBLIC_PATH = "server/pages/users.js";
const runtime = require("../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/[root of the server]__4bd124._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_next_1a8b1e._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_@mui_material_8e9398._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_@mui_system_esm_d50ec5._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_c6000a._.js");
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/pages.js { INNER_PAGE => \"[project]/src/pages/users/index.tsx [ssr] (ecmascript)\", INNER_DOCUMENT => \"[project]/node_modules/next/document.js [ssr] (ecmascript)\", INNER_APP => \"[project]/src/pages/_app.tsx [ssr] (ecmascript)\" } [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
