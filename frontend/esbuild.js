const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["src/components/widget/booking-widget.tsx"],
    bundle: true,
    outfile: "public/booking-widget.js",
    format: "iife",
    globalName: "BookingWidget",
    target: "es6",
    minify: true,
    sourcemap: true,
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
      "process.env.NEXT_PUBLIC_API_BASE_URL": JSON.stringify(
        "http://localhost:5000/api/appointments"
      ),
    },
    // Make sure we're not excluding React from the bundle
    external: [],
  })
  .catch((error) => {
    console.error("Build failed:", error);
    process.exit(1);
  });
