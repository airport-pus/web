/** @type {import('next').NextConfig} */
const pages = process.env.GITHUB_PAGES === 'true';
const nextConfig = {
 ...(pages ? { output: 'export', basePath: '/web', trailingSlash: true, images: { unoptimized: true }, distDir: '.next-pages' } : {}),
 env: { NEXT_PUBLIC_BASE_PATH: pages ? '/web' : '' },
 reactStrictMode: true,
 compiler: { styledComponents: true },
 devIndicators: false,
 turbopack: { root: import.meta.dirname },
};
export default nextConfig;
