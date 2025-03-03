import type { NextConfig } from "next";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import withSvgr from 'next-plugin-svgr';

const nextConfig: NextConfig = withSvgr({
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.boldbrands.pro',
                pathname: '**'
            }
        ]
    },
    
    
});
export default nextConfig;
