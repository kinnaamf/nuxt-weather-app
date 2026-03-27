// https://nuxt.com/docs/api/configuration/nuxt-config
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
  css: ['~/assets/pcss/main.pcss']
})