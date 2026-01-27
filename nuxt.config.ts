// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["/assets/css/main.css"],

  app: {
    head: {
      titleTemplate: "%s - Online Pasal",
      meta: [{ name: "description", content: "Online Pasal" }],
    },
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
  },

  modules: ["@nuxtjs/tailwindcss"],
  runtimeConfig: {
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  },
});
