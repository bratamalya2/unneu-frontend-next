/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
      },
    eslint: {
        ignoreDuringBuilds: true,
      },
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'unneu-images.s3.ap-south-1.amazonaws.com',
                pathname: '/**',
            },
        ],
    }
};

export default nextConfig;
