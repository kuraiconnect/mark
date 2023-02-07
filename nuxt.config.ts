// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // modules
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/apollo',
  ],
  // config
  runtimeConfig: {
    public: {
      API_AUTH_SERVICE: process.env.API_AUTH_SERVICE,
    },
  },
  // apollo
  apollo: {
    tokenStorage: 'localStorage',
    clients: {
      order: {
        httpEndpoint: `${process.env.API_ORDER_SERVICE}`,
        inMemoryCacheOptions: {
          addTypename: false,
        },
      },
    },
  },
})
