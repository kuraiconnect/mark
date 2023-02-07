export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('apollo:auth', ({ token }) => {
    if (process.server) {
      return
    }
    token.value = localStorage.getItem('accessToken')
  })
})
