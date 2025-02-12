export default defineNuxtRouteMiddleware(async (to, from) => {
    if (to.fullPath.includes('admin')) {
        setTimeout(() => {
            if (import.meta.client) {
                let user = JSON.parse(localStorage.getItem('user') + '');
                if (!user) return navigateTo('/login');
                if (user.roleId != 1) return navigateTo('/noPermissions')
            }
        }, 100);
    }
});
