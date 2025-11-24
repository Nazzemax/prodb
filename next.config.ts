import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import withSvgr from "next-plugin-svgr";
const nextConfig: NextConfig = withSvgr({
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "api.boldbrands.pro",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "img.youtube.com",
                pathname: "**",
            },
        ],
    },
    async headers() {
        return [
            {
                source: "/fonts/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
            {
                source: "/:all*(svg|jpg|jpeg|png|gif|webp|ico)",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
        ];
    },
});

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
