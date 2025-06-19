import type { NextConfig } from "next";

const imageHosts = [
  "images.unsplash.com",
  "tailwindcss.com",
  "plus.unsplash.com",
  "source.unsplash.com",
  "img.freepik.com",
  "rainn.org",
  "media.istockphoto.com",
  "cdn.pixabay.com",
  "lh3.googleusercontent.com",
  "randomuser.me",
  "s3.amazonaws.com",
  "avatars.githubusercontent.com",
  "cdn.jsdelivr.net",
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: imageHosts.map((hostname) => ({
      protocol: "https",
      hostname,
      port: "",
      pathname: "/**",
    })),
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
