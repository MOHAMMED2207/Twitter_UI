// next.config.mjs
export default {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        
        destination: "http://localhost:5005/:path*", // إعادة توجيه الطلبات إلى خادم API
      },
    ];
  },
  images: {
    domains: ["res.cloudinary.com"], // أضف النطاق هنا
  },
};
