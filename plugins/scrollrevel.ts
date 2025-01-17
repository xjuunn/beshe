export default defineNuxtPlugin((nuxtApp) => {
    if (import.meta.client) {
        nuxtApp.hook('page:transition:finish', async () => {
            const ScrollReveal = (await import('scrollreveal')).default;
            ScrollReveal().reveal('.scrollreveal-item');
        })
    }
})
