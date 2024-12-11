/** @type {import('next').NextConfig} */
const nextConfig = {
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
