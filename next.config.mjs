/** @type {import('next').NextConfig} */
const nextConfig = {
 reactStrictMode: true,
 compiler: { styledComponents: true },
 devIndicators: false,
 turbopack: { root: import.meta.dirname },
};
export default nextConfig;
