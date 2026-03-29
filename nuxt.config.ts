// https://nuxt.com/docs/api/configuration/nuxt-config
import fs from 'fs';
import path from 'path';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    'nuxt-lucide-icons'
  ],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL,
      apiKey: process.env.API_KEY
    }
  },
  css: ['~/assets/pcss/main.pcss'],

  devServer: {
    https: {
        key: './localhost+3-key.pem',
        cert: './localhost+3.pem'
    },
    host: '0.0.0.0'
  },
  app: {
      head: {
        meta: [
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1, viewport-fit=cover'
          },
          { name: 'theme-color', content: '#143F70' },
        ],
      },
    },
})