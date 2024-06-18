/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/adityasahas",
        permanent: true,
      },
      {
        source: "/linkedin",
        destination: "https://www.linkedin.com/in/adityasahas",
        permanent: true,
      },
      {
        source: "/resume",
        destination: "/resume.pdf",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
