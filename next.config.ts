// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images:{
//     domains: ['www.themealdb.com']
//   }
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.themealdb.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
