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
              value: "img-src 'self' https://*.stripe.com; frame-src https://connect-js.stripe.com https://checkout.stripe.com https://js.stripe.com;"
            }
          ]
        }
      ]
    }
  };
  
  module.exports = nextConfig;