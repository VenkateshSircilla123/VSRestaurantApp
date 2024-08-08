/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["res.cloudinary.com"],
    },
    async headers(){
      return [
        {
          source: '/(.*)',
          headers : [
            {
              key: 'Content-Security-Policy',
              value: ""
            }
          ]
        }
      ]
    }
  };
  
  module.exports = nextConfig;