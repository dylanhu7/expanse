/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    // remotePatterns: ["flowbite.s3.amazonaws.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flowbite.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "jvxeg2xuulqys3w3.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default config;
