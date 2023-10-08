// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/supabase'],
  css: ['@/assets/main.css'],
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL,
    },
  },
  supabase: {
    redirect: false,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: [],
    },
  },
  devtools: { enabled: true },
})
