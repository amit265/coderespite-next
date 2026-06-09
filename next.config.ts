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

      // https://interview-coach-ai-nine.vercel.app/interview-coach-ai
         {
        source: "/interview-coach-ai",
        destination: "https://interview-coach-ai-nine.vercel.app/interview-coach-ai",
      },
      {
        source: "/interview-coach-ai/:path*",
        destination:
          "https://https://interview-coach-ai-nine.vercel.app/interview-coach-ai/:path*",
      },
      {
        source: "/converter-hub",
        destination: "https://converter-hub-plum.vercel.app/converter-hub",
      },
      {
        source: "/converter-hub/:path*",
        destination:
          "https://converter-hub-plum.vercel.app/converter-hub/:path*",
      },
      {
        source: "/finance-calculator-hub",
        destination:
          "https://finance-calculator-hub-sooty.vercel.app/finance-calculator-hub",
      },
      {
        source: "/finance-calculator-hub/:path*",
        destination:
          "https://finance-calculator-hub-sooty.vercel.app/finance-calculator-hub/:path*",
      },
      {
        source: "/pdftoolkit",
        destination: "https://pdf-toolkit-eight.vercel.app/pdftoolkit",
      },
      {
        source: "/pdftoolkit/:path*",
        destination: "https://pdf-toolkit-eight.vercel.app/pdftoolkit/:path*",
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
