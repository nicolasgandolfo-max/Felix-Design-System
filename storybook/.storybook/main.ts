import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";

const tokensAlias = fileURLToPath(
  new URL("../../packages/ui/src/tokens/index.ts", import.meta.url)
);

// Sitio interno: no indexar. Se inyecta en el manager (index.html) y en el
// preview (iframe.html); se refuerza con `X-Robots-Tag` en nginx.conf.
const noindexMeta = `
  <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
`;

const config: StorybookConfig = {
  managerHead: (head) => `${head}${noindexMeta}`,
  previewHead: (head) => `${head}${noindexMeta}`,
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  staticDirs: [
    "../public",
    { from: "../../packages/ui/assets", to: "/assets" },
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal: (viteConfig) => {
    viteConfig.resolve = viteConfig.resolve ?? {};
    viteConfig.resolve.alias = {
      ...(viteConfig.resolve.alias as Record<string, string>),
      "@felix/ui/tokens": tokensAlias,
    };
    return viteConfig;
  },
};

export default config;
