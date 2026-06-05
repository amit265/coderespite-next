import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  /* config options here */
  async rewrites() {
    return [
        {
        // When a user visits this URL on coderespite.com...
        source: "/finance-calculator-hub",
        // ...silently fetch the content from your new Vercel app!
        destination: "https://finance-calculator-hub-sooty.vercel.app/finance-calculator-hub",
      },
      {
        // This handles all sub-pages like /ai-writing/grammar-checker
        source: "/finance-calculator-hub/:path*",
        destination: "https://finance-calculator-hub-sooty.vercel.app/finance-calculator-hub/:path*",
      },
      {
        // When a user visits this URL on coderespite.com...
        source: "/ai-writing",
        // ...silently fetch the content from your new Vercel app!
        destination: "https://ai-writing-swart.vercel.app/ai-writing",
      },
      {
        // This handles all sub-pages like /ai-writing/grammar-checker
        source: "/ai-writing/:path*",
        destination: "https://ai-writing-swart.vercel.app/ai-writing/:path*",
      },

    ];
  },
};

export default withMDX(nextConfig);
