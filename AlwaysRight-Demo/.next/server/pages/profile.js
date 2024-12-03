const CHUNK_PUBLIC_PATH = "server/pages/profile.js";
const runtime = require("../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/[root of the server]__3d1363._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_next_1daa8f._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_@mui_system_esm_c14b36._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_@mui_material_02a306._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_df193e._.js");
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/pages.js { INNER_PAGE => \"[project]/src/pages/profile.tsx [ssr] (ecmascript)\", INNER_DOCUMENT => \"[project]/node_modules/next/document.js [ssr] (ecmascript)\", INNER_APP => \"[project]/src/pages/_app.tsx [ssr] (ecmascript)\" } [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
