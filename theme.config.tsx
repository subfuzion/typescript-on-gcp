import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>TypeScript on GCP</span>,
  project: {
    link: 'https://github.com/subfuzion/typescript-on-gcp',
  },
  chat: {
    link: 'https://discord.com',
  },
  docsRepositoryBase: 'https://github.com/subfuzion/typescript-on-gcp',
  footer: {
    text: 'TypeScript on GCP - Copyright (c) 2023 Tony Pujals. All rights reserved',
  },
  useNextSeoProps: function() {
    return {
      titleTemplate: '%s – TypeScript on GCP'
    }
  }
}

export default config
