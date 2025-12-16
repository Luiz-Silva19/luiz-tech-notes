import { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Luiz Tech Notes',
  tagline:
    'Estudos e documentação em tecnologias modernas: AWS, Backend, Infra, Cloud, DevOps',
  favicon: 'img/favicon.ico',
  url: 'https://luiz-silva19.github.io',
  baseUrl: '/luiz-tech-notes/',
  organizationName: 'luiz-silva19',
  projectName: 'luiz-tech-notes',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/Luiz-Silva19/luiz-tech-notes/tree/main/',
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: 'all',
            copyright: `Copyright © ${new Date().getFullYear()} Luiz Tech Notes.`,
          },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Luiz Tech Notes',
      logo: {
        alt: 'Luiz Tech Notes',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentação',
        },
        {
          href: 'https://github.com/Luiz-Silva19/luiz-tech-notes',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentação',
          items: [
            {
              label: 'AWS',
              to: '/docs/aws/',
            },
            {
              label: 'Backend',
              to: '/docs/backend/',
            },
            {
              label: 'Infra',
              to: '/docs/infra/',
            },
          ],
        },
        {
          title: 'Comunidade',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/Luiz-Silva19',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Luiz Tech Notes. Built with Docusaurus.`,
    },
    prism: {
      theme: require('prism-react-renderer').themes.github,
      darkTheme: require('prism-react-renderer').themes.dracula,
      additionalLanguages: [
        'bash',
        'docker',
        'yaml',
        'json',
        'typescript',
        'javascript',
        'powershell',
        'csharp',
      ],
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
